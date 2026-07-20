"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";


import {
    getMe,
    logoutUser,
} from "@/lib/api/auth";



const AuthContext = createContext();



export function AuthProvider({ children }) {


    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);



    // ==========================
    // LOAD CURRENT USER
    // ==========================

    const loadUser = async () => {


        try {


            const data = await getMe();



            if (data.success) {
                 console.log("AUTH USER:", data.user);


                setUser(data.user);


            } 
            else {


                setUser(null);


            }



        } 
        
        catch (error) {


            console.log(
                "Load User Error:",
                error
            );


            setUser(null);


        } 
        
        finally {


            setLoading(false);


        }


    };

    // ==========================
    // CHECK AUTH
    // ==========================

    const checkAuth = async () => {


        await loadUser();


    };

    // ==========================
    // LOGIN
    // ==========================

    const login = async () => {


        await loadUser();


    };

    // ==========================
    // REFRESH USER
    // ==========================

    const refreshUser = async () => {


        await loadUser();


    };





    // ==========================
    // LOGOUT
    // ==========================

    const logout = async () => {


        try {


            await logoutUser();
        } 
        
        catch (error) {


            console.log(
                "Logout Error:",
                error
            );


        }

        setUser(null);



    };

    // ==========================
    // AUTO CHECK LOGIN
    // ==========================

    useEffect(() => {


        checkAuth();


    }, []);

    return (

        <AuthContext.Provider


            value={{

                user,


                setUser,


                loading,


                login,


                logout,


                checkAuth,


                refreshUser,


                isAuthenticated: !!user,


isAdmin:
    user?.role === "admin" ||
    user?.role === "superadmin",

isSuperAdmin:
    user?.role === "superadmin",


            }}


        >

            {children}


        </AuthContext.Provider>


    );


}





// ==========================
// CUSTOM HOOK
// ==========================


export function useAuth() {


    return useContext(AuthContext);


}