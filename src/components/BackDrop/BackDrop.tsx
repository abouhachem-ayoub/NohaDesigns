import { FC } from "react";

type Props = {
    isOpen:boolean;
};
const BackDrop : FC<Props> = ({isOpen}) => {
    if(isOpen) return <div className="fixed z-[60] top-0 left-0 w-sreen h-screen bg-[rgba(0,0,0,0.8)]"/>
    else return <></>
}
export default BackDrop