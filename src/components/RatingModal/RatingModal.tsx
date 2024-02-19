import { Dispatch, FC, SetStateAction, useState ,useRef} from "react";
import { BsStarFill } from "react-icons/bs";

type Props = {
    isOpen:boolean;
    //ratingValue:number;
    //setRatingValue:Dispatch<SetStateAction<number>>;
    //ratingText:string;
    //setRatingText:Dispatch<SetStateAction<string>>;
    reviewSubmitHandler:(rating: any, opinion: any) => Promise<void>;
    isSubmittingReview:boolean;
    toggleRatingModal:() => void
}
const RatingModal:FC<Props> = (Props) => {
    const [ratingValue,setRatingValue] = useState(0);
    const [ratingText,setRatingText] = useState('');
const {isOpen,reviewSubmitHandler,isSubmittingReview,toggleRatingModal} = Props;
const starValues = [1,2,3,4,5];
  return (
    <div className={`fixed z-[66] inset-0 flex items-center justify-center ${isOpen?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`}>
        <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl dark:text-gray-800 font-semibold mb-2">Rate this Product</h2>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 ">Rating</label>
            <div className="flex items-center ">
                {starValues.map(value => {
                    return <button key={value}
                    type="button"
                    onClick={(e)=>{ e.preventDefault(); setRatingValue(value)}}
                    className={`w-6 h-6 ${ratingValue>=value ? "text-yellow-500":"text-gray-300"}`}>
                        <BsStarFill/>
                    </button>
                })}
            </div>
        </div>
        <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Tell us more about it:
                </label>
                <textarea 
                onChange={e=>setRatingText(e.target.value)}
                value={ratingText}
                rows={4}
                className="w-full px-2 py-3 border rounded-md"
                >
                </textarea>
        </div>
        <div className="flex justify-end">
                <button className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={async ()=>
                    {   
                        await reviewSubmitHandler(ratingValue,ratingText);
                        setRatingText("");
                        setRatingValue(0)
                    }
                }
                disabled={isSubmittingReview}
                type="button"
                >
                    {isSubmittingReview? "Submitting" : "Submit"}
                </button>
                <button onClick={()=>{toggleRatingModal()
                        setRatingText("");
                        setRatingValue(0);
                        }
                } 
                className="ml-2 px-4 py-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                    Cancel
                </button>
        </div>
        </div>
    </div>
  )
}

export default RatingModal