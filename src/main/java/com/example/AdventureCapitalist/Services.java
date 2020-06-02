package com.example.AdventureCapitalist;

import com.example.AdventureCapitalist.generated.World;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class Services {

   public World readWorldFromXml() {
       World lWorld = new World();
       try {
           JAXBContext cont = JAXBContext.newInstance(World.class);
           Unmarshaller u = cont.createUnmarshaller();
           InputStream input = getClass().getClassLoader().getResourceAsStream("World.xml");
           lWorld= (World) u.unmarshal(input);
       } catch (Exception e) {
           System.out.println(e.getMessage());
       }
       return lWorld;
   }

   public void saveWordlToXml(World world){
       try{
           JAXBContext cont = JAXBContext.newInstance(World.class);
           Marshaller m = cont.createMarshaller();
           OutputStream output = new FileOutputStream("World.xml");
           m.marshal(world, output);
       } catch (Exception e){
           System.out.println(e.getMessage());
       }
   }

   public World getWorld(){
       return readWorldFromXml();
   }
}
