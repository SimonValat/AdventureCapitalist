package com.example.AdventureCapitalist;

import com.example.AdventureCapitalist.generated.World;
import com.sun.xml.internal.ws.util.Pool;

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
       return readWorldFromXml(pPlayerName);
   }
}
