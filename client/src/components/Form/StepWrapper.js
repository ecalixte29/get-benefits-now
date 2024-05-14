const StepWrapper = (props) => {
    return (
        <div class="bg-white border border-light rounded-lg overflow-hidden mb-8">
            <div class="bg-primary p-6 flex justify-between items-center">
                <h2 class="text-white font-semibold text-2xl">{props.title}</h2>
                <i class="fas fa-check-circle text-white text-2xl"></i>
            </div>
            <form class="p-6 border-b-8 border-primary">
                {props.children}
            </form>
        </div>
    )
}

export default StepWrapper