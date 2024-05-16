export const FormReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload }
        case 'UPDATE_INPUT_FIELD':
            const { id, value, shouldDelete } = action.payload
            const keys = id.split('-')
            let errorIds = state.errorIds
            let current = state.data

            if (value.length > 0 && state.errorIds.includes(id))
                errorIds = state.errorIds.filter(errorId => errorId !== id)
            keys.forEach((key, index) => {
                // Check if the key is an index for an array
                if (!isNaN(key)) {
                    key = parseInt(key)
                    // Ensure the current level is an array
                    if (!Array.isArray(current)) {
                        current = []
                    }
                    // Ensure the array has an object at the current index if we're not deleting
                    if (
                        !shouldDelete &&
                        (!current[key] || typeof current[key] !== 'object')
                    ) {
                        current[key] = {}
                    }
                    if (index === keys.length - 1) {
                        if (shouldDelete) {
                            current.splice(key, 1)
                        } else {
                            current[key] = value
                        }
                    } else {
                        current = current[key]
                    }
                } else {
                    // Handle the case where the key is a string (object key)
                    if (index === keys.length - 1) {
                        if (shouldDelete) {
                            delete current[key]
                        } else {
                            current[key] = value
                        }
                    } else {
                        if (!current[key] || typeof current[key] !== 'object') {
                            current[key] = isNaN(keys[index + 1]) ? {} : []
                        }
                        current = current[key]
                    }
                }
            })
            return { ...state, data: state.data, errorIds }
        case 'NEXT_STEP':
            return { ...state, currentStep: state.currentStep + 1 }
        case 'PREVIOUS_STEP':
            return {
                ...state,
                currentStep: state.currentStep - 1,
            }
        case 'SET_ERROR_IDS':
            return { ...state, errorIds: action.payload }
        default:
            return state
    }
}
