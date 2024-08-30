import { redirect } from "@sveltejs/kit";

export function load({params}){
    redirect(302, `/search/${params.slug}/1`)
}