package com.example.AdventureCapitalist;
import com.example.AdventureCapitalist.generated.PallierType;
import com.example.AdventureCapitalist.generated.PalliersType;
import com.example.AdventureCapitalist.generated.ProductType;
import com.example.AdventureCapitalist.generated.World;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("generic")
public class Webservice {
    Services services;
    public Webservice() {
        services = new Services();
    }

    @GET
    @Path("world")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response getWorld(@Context HttpServletRequest request) {
        String username = request.getHeader("X-user");
        World lWorld = services.getWorld(username);
        services.saveWorldToXml(lWorld, username);
        return Response.ok(lWorld).build();
    }

    @PUT
    @Path("product")
    public void productAction (@Context HttpServletRequest request ,@RequestBody ProductType pProductType){
        String username = request.getHeader("X-user");
        services.updateProduct(username,pProductType);git
    }

    @PUT
    @Path("manager")
    public void managerAction(@Context HttpServletRequest request, @RequestBody PallierType pPallierType){
        String username = request.getHeader("X-user");
        services.updateManager(username,pPallierType);
    }

    @GET
    @Path("test")
    public Response testProduct(@Context HttpServletRequest request){
        String username = request.getHeader("X-user");
        World lWorld = services.getWorld(username);
        return Response.ok(lWorld.getManagers().getPallier().get(0)).build();
    }


}



