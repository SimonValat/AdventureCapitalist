package com.example.AdventureCapitalist;

import com.example.AdventureCapitalist.generated.PallierType;
import com.example.AdventureCapitalist.generated.ProductType;
import com.example.AdventureCapitalist.generated.ProductsType;
import com.example.AdventureCapitalist.generated.World;
import com.sun.xml.internal.ws.util.Pool;
import org.apache.tomcat.jni.Time;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;

public class Services {

   public World readWorldFromXml(String pPlayername) {
        InputStream inputStream = null;

        if(pPlayername != null){
            String filename = pPlayername + "-"+"world.xml";
            try {
                inputStream = new FileInputStream(filename);
            } catch (FileNotFoundException e){

            }
        }

        if(inputStream == null){
            inputStream = getClass().getClassLoader().getResourceAsStream("World.xml");
        }

        if(inputStream == null){
            return null;
        }

        JAXBContext lJaxbContext;

        try {
            lJaxbContext = JAXBContext.newInstance(World.class);
            Unmarshaller unmarshaller = lJaxbContext.createUnmarshaller();
            World lWorld = (World) unmarshaller.unmarshal(inputStream);
            inputStream.close();
            return lWorld;
        } catch(JAXBException | IOException ex){
            ex.printStackTrace();
        }
        return null;
   }

   public void saveWorldToXml(World pWorld, String pPlayername){
      OutputStream output = null;

      if(pPlayername == null) return;

      String file = pPlayername +"-" + "world.xml";
      try{
          output = new FileOutputStream(file);
      } catch(FileNotFoundException e){
          e.printStackTrace();
          return;
      }

       JAXBContext lJaxbContext;

      try {
          lJaxbContext = JAXBContext.newInstance(World.class);
          Marshaller lMarshaller = lJaxbContext.createMarshaller();
          lMarshaller.marshal(pWorld,output);
          output.close();
      } catch (Exception ex){
          ex.printStackTrace();
      }
   }

   public World getWorld(String pPlayerName){

       World lWorld = readWorldFromXml(pPlayerName);
       updatePlayerScore(lWorld);
       saveWorldToXml(lWorld,pPlayerName);
       return lWorld;

   }

    public boolean updateProduct(String username,ProductType pProduct){
        World lWorld = getWorld(username);

        ProductType product = findProductById(lWorld, pProduct.getId());
        if(product == null){
            return false;
        }

        int qtchange = pProduct.getQuantite() - product.getQuantite();
        System.out.println(pProduct.getQuantite());
        if(qtchange>0){
            lWorld.setMoney(lWorld.getMoney()-product.getCout()*qtchange);
            product.setQuantite(pProduct.getQuantite());
            System.out.println(product.getQuantite()+ "toto");
        } else{
            product.setTimeleft(product.getVitesse());
        }

        saveWorldToXml(lWorld, username);
        return true;
    }

    public ProductType findProductById(World pWorld,int pId){
        ProductType lProduct = new ProductType();
        for(ProductType item : pWorld.getProducts().getProduct() ){
            if(item.getId()==pId){
                lProduct=item;
            }
        }
        return lProduct;
    }

    public Boolean updateManager(String username, PallierType pManager) {
       World lWorld = getWorld(username);
       PallierType manager = findManagerByName(lWorld, pManager.getIdcible());
       if(manager == null) {
           return false;
       }
       ProductType lProduct = findProductById(lWorld,manager.getIdcible());
       if(lProduct == null){
           return false;
       }
        lProduct.setManagerUnlocked(true);
        manager.setUnlocked(true);
        lWorld.setMoney(lWorld.getMoney()-manager.getSeuil());
        saveWorldToXml(lWorld,username);
        return true;
    }

    public PallierType findManagerByName(World pWorld,int pId){
        PallierType lPallier = new PallierType();
        for(PallierType item : pWorld.getManagers().getPallier()){
            if(item.getIdcible()==pId){
                lPallier=item;
            }
        }
        return lPallier;
    }

    public void updatePlayerScore(World pWorld){
        long TimeDif = System.currentTimeMillis()-pWorld.getLastupdate();
        for(ProductType item : pWorld.getProducts().getProduct()){
            if(item.getTimeleft() >0 && !item.isManagerUnlocked()){
                if(TimeDif >item.getTimeleft()){
                    item.setTimeleft(0);
                    pWorld.setMoney(pWorld.getMoney()+item.getRevenu()*item.getQuantite());
                    pWorld.setScore(pWorld.getScore()+item.getRevenu()*item.getQuantite());
                } else{
                    item.setTimeleft(item.getTimeleft() - TimeDif);
                }
            }
            else if(item.isManagerUnlocked()){
               int nbProduce = 0;
               if(item.getTimeleft() != 0 && item.getTimeleft()>TimeDif){
                   nbProduce++;
                   TimeDif = TimeDif - item.getTimeleft();
                   item.setTimeleft(0);
               }
               while(TimeDif >= item.getVitesse()){
                   nbProduce++;
                   TimeDif = TimeDif-item.getVitesse();
               }
                pWorld.setMoney(pWorld.getMoney()+nbProduce*item.getRevenu()*item.getQuantite());
                pWorld.setScore(pWorld.getScore()+nbProduce*item.getRevenu()*item.getQuantite());
                item.setTimeleft(TimeDif);
            }
        }
       //on met à jour le last update
        pWorld.setLastupdate(System.currentTimeMillis());
    }


   // double revenus = quantiteproduite * product.getQuantite() * product.getRevenu();
    // bonus des anges
    //revenus += revenus * (world.getActiveangels() * world.getAngelbonus() / 100);

}


