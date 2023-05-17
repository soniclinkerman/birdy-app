import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";


const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading) return;
        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading,registerModal,loginModal])

    const onSubmit = useCallback(() => {
        try{
            setIsLoading(true);

            //TODO ADD REGISTER AND LOG IN

            registerModal.onClose();

        }
        catch(error){
            console.log(error)
        } finally{
            setIsLoading(false);
        }
    }, [registerModal])



    const bodyContent = (
        <div
        className="
        flex
        flex-col
        gap-4
        "
        >
            <Input 
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
            />

            <Input 
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            disabled={isLoading}
            />


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
            />
        </div>  
    )

    const footerContent = (
        <div className="
        text-neutral-400 text-center mt-4">
          <p>Already have an account?{" "}  
          <span
          onClick={onToggle}
          
          className="text-white cursor-pointer hover:underline">
              Sign In
          </span>
          </p>
        </div>
        )

  return (

   <Modal 
   disabled={isLoading}
   isOpen={registerModal.isOpen}
   actionLabel="Register"
   onClose={registerModal.onClose}
   title="Create an account"
   body={bodyContent}
   onSubmit={onSubmit}
   footer={footerContent}
   />
  )
}

export default RegisterModal;
