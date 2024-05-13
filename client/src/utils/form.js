import states from 'states-us'
import family from '../assets/images/family.webp'
import insurance from '../assets/images/insurance-icon.png'
import location from '../assets/images/location.png'
import newlyweds from '../assets/images/newlyweds.png'
import phone from '../assets/images/phone-icon.png'
import flag from '../assets/images/united-states-flag.png'
import user from '../assets/images/user-details.png'
import wage from '../assets/images/wage.png'

//types: radio_group, text, currency, email, tel, select, number
//TODO: Add icons for each
//TODO: Add advance validation ie max length, min length
export const FIELD_NAMES = {
    TYPE: 'type',
    CURRENT_INSURANCE: 'current_insurance',
    GROSS_INCOME: 'gross_income',
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    GENDER: 'gender',
    DOB: 'dob',
    USES_TOBACCO: 'uses_tobacco',
    SPOUSE_DETAILS: 'spouse_details',
    EMAIL: 'email',
    PHONE: 'phone',
    STREET: 'street',
    COUNTY: 'county',
    CITY: 'city',
    STATE: 'state',
    ZIP: 'zip',
    DEPENDENTS: 'dependents',
    RELATIONSHIP: 'relationship',
    SOCIAL_SECURITY_NUMBER: 'social_security_number',
    US_NATIONAL: 'us_national',
};

const FIELD_TYPES = {
    RADIO_GROUP: 'radio_group',
    TEXT: 'text',
    CURRENCY: 'currency',
    EMAIL: 'email',
    TEL: 'tel',
    SELECT: 'select',
    NUMBER: 'number',
    DATE: 'date',
    APPENDABLE_FORM: 'appendable_form',
}

export const STEPS = [
    {
        name: 'eligibility',
        subSteps: [
            {
                name: FIELD_NAMES.TYPE,
                title: 'Who would you like to insure?',
                icon: insurance,
                fields: [
                    {
                        name: FIELD_NAMES.TYPE,
                        label: 'Insurance Type',
                        type: FIELD_TYPES.RADIO_GROUP,
                        required: true,
                        value: '',
                        data: ['Single', 'Couple', 'Family', 'Single Parent'],
                    },
                ],
            },
            {
                name: FIELD_NAMES.CURRENT_INSURANCE,
                title: 'Are you on Medicaid or Medicare?',
                icon: insurance,
                fields: [
                    {
                        name: FIELD_NAMES.CURRENT_INSURANCE,
                        label: 'are you on Medicare or Medicaid?',
                        type: FIELD_TYPES.RADIO_GROUP,
                        required: true,
                        value: '',
                        data: ['Yes', 'No'],
                    },
                ],
            },
            {
                name: 'income',
                title: 'Select your gross monthly income range',
                subtitle:
                    'Gross monthly income. Please be accurate. Income will be verified by Healthcare.gov',
                icon: wage,
                fields: [
                    {
                        name: FIELD_NAMES.GROSS_INCOME,
                        type: FIELD_TYPES.CURRENCY,
                        required: true,
                        value: '',
                        label: 'gross salary',
                        prefix: '$',
                        min: '1500'
                    },
                ],
            },
        ],
    },
    {
        name: 'your_info',
        subSteps: [
            {
                name: 'details',
                title: 'Add your details',
                subtitle: 'Let us know more about yourself',
                icon: user,
                fields: [
                    {
                        name: FIELD_NAMES.FIRST_NAME,
                        placeholder: 'john',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'first name',
                    },
                    {
                        name: FIELD_NAMES.LAST_NAME,
                        placeholder: 'doe',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'last name',
                    },
                    {
                        name: FIELD_NAMES.GENDER,
                        type: FIELD_TYPES.RADIO_GROUP,
                        value: '',
                        required: true,
                        data: ['male', 'female'],
                    },
                    {
                        name: FIELD_NAMES.DOB,
                        placeholder: 'john',
                        type: 'date',
                        value: '',
                        required: true,
                        label: 'date of birth',
                    },
                    {
                        name: FIELD_NAMES.USES_TOBACCO,
                        type: FIELD_TYPES.RADIO_GROUP,
                        value: '',
                        required: true,
                        label: 'Are you a tobacco user?',
                        data: ['Yes', 'No'],
                    },
                ],
            },
            {
                name: 'spouse_details',
                title: 'Add spouse details',
                subtitle: 'Provide Information About Your Spouse',
                icon: newlyweds,
                dependency: {
                    name: 'type',
                    values: ['Couple', 'Family'],
                },
                fields: [
                    {
                        name: FIELD_NAMES.FIRST_NAME,
                        placeholder: 'john',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'first name',
                    },
                    {
                        name: FIELD_NAMES.LAST_NAME,
                        placeholder: 'doe',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'last name',
                    },
                    {
                        name: FIELD_NAMES.GENDER,
                        label: FIELD_NAMES.GENDER,
                        type: FIELD_TYPES.RADIO_GROUP,
                        value: '',
                        required: true,
                        data: ['male', 'female'],
                    },
                    {
                        name: FIELD_NAMES.DOB,
                        placeholder: 'john',
                        type: 'date',
                        value: '',
                        required: true,
                        label: 'date of birth',
                    },
                    {
                        name: FIELD_NAMES.SOCIAL_SECURITY_NUMBER,
                        type: 'number',
                        value: '',
                        required: true,
                        label: 'social security number',
                    },
                    {
                        name: FIELD_NAMES.USES_TOBACCO,
                        type: FIELD_TYPES.RADIO_GROUP,
                        value: '',
                        required: true,
                        label: 'Are you a tobacco user?',
                        data: ['Yes', 'No'],
                    },
                ],
            },
            {
                name: 'contact',
                title: 'Add your contact details',
                subtitle: 'Give us your contact details so we can contact you',
                icon: phone,
                fields: [
                    {
                        name: FIELD_NAMES.EMAIL,
                        type: FIELD_NAMES.EMAIL,
                        placeholder: 'john.doe@example.com',
                        value: '',
                        required: true,
                        label: FIELD_NAMES.EMAIL,
                    },
                    {
                        name: 'phone',
                        type: 'tel',
                        placeholder: '(123) 456-7890',
                        value: '',
                        required: true,
                        label: 'phone number',
                    },
                ],
            },
            {
                name: 'address',
                title: 'Add your address',
                subtitle: 'Please provide your current residential address.',
                icon: location,
                fields: [
                    {
                        name: FIELD_NAMES.STREET,
                        type: 'text',
                        placeholder: '1234 Main St.',
                        value: '',
                        required: true,
                        label: FIELD_NAMES.STREET,
                    },
                    {
                        name: FIELD_NAMES.COUNTY,
                        type: 'text',
                        placeholder: FIELD_NAMES.COUNTY,
                        value: '',
                        label: FIELD_NAMES.COUNTY,
                    },
                    {
                        name: FIELD_NAMES.CITY,
                        type: 'text',
                        placeholder: FIELD_NAMES.CITY,
                        value: '',
                        required: true,
                        label: FIELD_NAMES.CITY,
                    },
                    {
                        name: FIELD_NAMES.STATE,
                        type: 'select',
                        placeholder: FIELD_NAMES.STATE,
                        value: '',
                        required: true,
                        label: FIELD_NAMES.STATE,
                        data: states.map(state => state.name),
                    },
                    {
                        name: FIELD_NAMES.ZIP,
                        type: 'number',
                        placeholder: '12345',
                        value: '',
                        required: true,
                        label: 'zip code',
                    },
                ],
            },
            {
                name: 'dependents',
                title: 'Dependents',
                subtitle: 'Individuals relying on you financially',
                icon: family,
                dependency: {
                    name: 'type',
                    values: ['Single Parent', 'Family'],
                },
                fields: [
                    {
                        name: FIELD_NAMES.DEPENDENTS,
                        label: 'add dependent',
                        type: 'appendable_form',
                        value: [],
                        required: false,
                        fields: [
                            {
                                name: FIELD_NAMES.FIRST_NAME,
                                placeholder: 'john',
                                type: 'text',
                                value: '',
                                required: true,
                                label: 'first name',
                            },
                            {
                                name: FIELD_NAMES.LAST_NAME,
                                placeholder: 'doe',
                                type: 'text',
                                value: '',
                                required: true,
                                label: 'last name',
                            },
                            {
                                name: FIELD_NAMES.GENDER,
                                label: FIELD_NAMES.GENDER,
                                type: FIELD_TYPES.RADIO_GROUP,
                                value: '',
                                required: true,
                                data: ['male', 'female'],
                            },
                            {
                                name: FIELD_NAMES.RELATIONSHIP,
                                label: 'relationship with applicant',
                                placeholder: 'child, sibling etc',
                                type: 'select',
                                value: '',
                                required: true,
                                data: [
                                    'Self',
                                    'Brother or Sister',
                                    'Child',
                                    'Collateral Dependent',
                                    'Ex-Spouse',
                                    'Foster Child',
                                    'Grandson or Granddaughter',
                                    'Life Partner',
                                    'Nephew or Niece',
                                    'Other Relationship',
                                    'Other Relative',
                                    'Sponsored Dependent',
                                    'Spouse',
                                    'Stepson or Stepdaughter',
                                    'Ward',
                                    'Adopted Child',
                                    'Annultant',
                                    'Brother-in-Law or Sister-in-Law',
                                    'Court Appointed Guardian',
                                    'Dependent of a Minor Dependent',
                                    'Guardian',
                                    'Son-in-Law or Daughter-in-Law',
                                    'Stepparent',
                                ],
                            },
                            {
                                name: FIELD_NAMES.DOB,
                                placeholder: 'john',
                                type: 'date',
                                value: '',
                                required: true,
                                label: 'date of birth',
                            },
                            {
                                name: FIELD_NAMES.SOCIAL_SECURITY_NUMBER,
                                type: 'number',
                                value: '',
                                required: true,
                                label: 'social security number',
                            },
                            {
                                name: FIELD_NAMES.USES_TOBACCO,
                                type: FIELD_TYPES.RADIO_GROUP,
                                value: '',
                                required: true,
                                label: 'Are you a tobacco user?',
                                data: ['Yes', 'No'],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'personalize',
        subSteps: [
            {
                name: 'us_national',
                title: 'Nationality',
                subtitle: 'Are you a US citizen?',
                icon: flag,
                fields: [
                    {
                        name: 'us_national',
                        label: 'nationality',
                        type: FIELD_TYPES.RADIO_GROUP,
                        value: '',
                        required: true,
                        data: ['Yes', 'No'],
                    },
                ],
            },
        ],
    },
]
