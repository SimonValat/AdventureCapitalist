package com.example.AdventureCapitalist;
import com.example.AdventureCapitalist.generated.World;

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

}



