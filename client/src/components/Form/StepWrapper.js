import { FaCheckCircle } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

const StepWrapper = (props) => {
    return (
        <div key={props.title} className="mb-8 overflow-hidden rounded-lg border border-light bg-white">
            <div className="flex items-center justify-between bg-primary p-6">
                <h2 className="text-2xl font-semibold text-white">{props.title}</h2>
                {props.removable ? (
                    <ImCross onClick={props.onRemove} color="white" className="hover:cursor-pointer" />
                ) : (
                    <FaCheckCircle color='white' size={25} />
                )}
            </div>
            <form className="border-b-8 border-primary p-6">{props.children}</form>
        </div>
    )
}

export default StepWrapper
