import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";


const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try{
            setIsLoading(true);

            await signIn("credentials", {
                email,
                password
            })

            loginModal.onClose();

        }
        catch(error){
            console.log(error)
        } finally{
            setIsLoading(false);
        }
    }, [loginModal, email,password])

    const onToggle = useCallback(() => {
        if(isLoading) return;

        registerModal.onOpen();
        loginModal.onClose();
    },[loginModal,registerModal,isLoading])


    const bodyContent = (
        <div
        className="
        flex
        flex-col
        gap-4
        "
        
        >
            <Input 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
            />

            <Input 
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            type="password"
            />

        </div>
    )


    const footerContent = (
         <div className="
        text-neutral-400 text-center mt-4">
          <p>Don't have an account?{" "}   
          <span
          onClick={onToggle}
    
          className="text-white cursor-pointer hover:underline">
              Sign Up
          </span>
          </p>
        </div>
    )

  return (
   <Modal 
   disabled={isLoading}
   isOpen={loginModal.isOpen}
   actionLabel="Sign in"
   onClose={loginModal.onClose}
   title="Login"
   body={bodyContent}
   onSubmit={onSubmit}
   footer={footerContent}
   />
  )
}

export default LoginModal
