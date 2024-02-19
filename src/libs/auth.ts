import { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import sanityClient from "./sanity";


export const authOptions:NextAuthOptions = {
    providers:[
    /* FacebookProvider({
            idToken:true,
            clientId:process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET as string,
            authorization: {
                    url: "https://www.facebook.com/v11.0/dialog/oauth",
                    params: {
                    client_id: process.env.FACEBOOK_CLIENT_ID as string,
                    scope: "openid email",
                    response_type: "code",
                    },    
                },
    
    }),*/
     /*FacebookProvider({
    idToken: true,
    clientId: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,

    authorization: {
      url: "https://www.facebook.com/v11.0/dialog/oauth",
      params: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        scope: "openid email",
        response_type: "code",
      },
    },
    // wellKnown: "https://www.facebook.com/.well-known/openid-configuration/",
    token: {
      url: "https://graph.facebook.com/oauth/access_token",
      async request(context) {
        try {
          // request to https://graph.facebook.com/oauth/access_token?code=""&client_id=""&redirect_uri=""&client_secret=""
          const response = await axios.get('https://graph.facebook.com/oauth/access_token', {
            params: {
              code: context.params.code,
              client_id: context.provider.clientId,
              redirect_uri: context.provider.callbackUrl,
              client_secret: context.provider.clientSecret,
            },
          });

          const tokens = response.data;
          return { tokens };
        } catch (error) {
          throw error;
        }
      },
    },
            }),*/
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID as string,
            clientSecret:process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }),
        SanityCredentials(sanityClient)
    ],
    session:{
        strategy:'jwt',
    },
    adapter:SanityAdapter(sanityClient),
    debug: process.env.NODE_ENV ==="development",
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
      session: async({session,token}) =>{
        const userEmail = token.email;
        const userIdObject = await sanityClient.fetch<{_id:string}>(`*[_type == "user" && email==$email][0]{_id}`,
        {email:userEmail});
        return {
          ...session,
          user:{
            ...session.user,
            id:userIdObject._id,
          },
        };
      }
    }
}