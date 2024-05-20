const Loader = () => {
    return (
        <div class="flex h-screen items-center justify-center">
            <div class="relative inline-flex">
                <div class="h-8 w-8 rounded-full bg-primary-950"></div>
                <div class="absolute left-0 top-0 h-8 w-8 animate-ping rounded-full bg-primary-950"></div>
                <div class="absolute left-0 top-0 h-8 w-8 animate-pulse rounded-full bg-primary-950"></div>
            </div>
        </div>
    )
}

export default Loader
