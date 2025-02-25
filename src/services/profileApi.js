import { supabase } from "./supabase";
import { useQuery } from "@tanstack/react-query";

export async function fetchProfile() {

    const user = JSON.parse(localStorage.getItem('user')) || null;
    const { data: profile, error } = await supabase
        .from('Profile')
        .select('is_admin')
        .eq('id', user?.id)
        .single();

    if (error) throw new Error(error.message);
    return profile;
}
// export async function fetchAllProfiles() {

//     const { data: profile, error } = await supabase
//         .from('Profile')
//         .select('*')
//     console.log(profile)

//     if (error) throw new Error(error.message);
//     return profile;
// }


export const usefetchAllProfiles = () => {
    return useQuery({
        queryKey: ['AllProfiles'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('Profile')
                .select('*')

            if (error) throw new Error(error.message);
            return data;
        }
    });
};