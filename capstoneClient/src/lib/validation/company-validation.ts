import jwt from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";

export async function validateCompany(ctx: GetServerSidePropsContext) {
  const token = ctx.req.cookies.token as string;
  if (token) {
    const companyToken: any = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.NEXT_PUBLIC_TOKEN_SECRET as string,
        {},
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        }
      );
    });
    if (companyToken.role === "company") {
      return {
        props: {
          company: companyToken,
        },
      };
    } else if (companyToken.role === "admin") {
      return {
        redirect: {
          destination: "/admin/dashboard",
        },
      };
    } else {
      return {
        redirect: {
          destination: "/user/dashboard",
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}
