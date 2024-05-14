const CheckBox = ({label, id, value}) => {
    return (
        <div class="mb-6 flex items-center" key={label}>
            <input defaultChecked={value} type="checkbox" id={id} />
            <label className="block text-gray-500 text-base ml-2">{label}</label>
        </div>
    )
}

export default CheckBox