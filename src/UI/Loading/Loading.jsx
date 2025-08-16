import { PuffLoader } from "react-spinners";

export default function Loading() { 
    return ( 
        <div className="dashboard-page flex justify-center items-center w-6/7 p-40 ms-100 ">
            <PuffLoader color={'var(--color-purple-500)'}/>
        </div>
    )
}