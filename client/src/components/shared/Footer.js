import { Link } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => {
    return (
        <div className="mt-8 bg-dark">
            <div className="container mx-auto space-y-8 pb-4 pt-8 text-white">
                <div className="mx-auto grid w-11/12 grid-cols-1 items-start justify-between sm:w-auto sm:grid-cols-4">
                    <Logo className="!text-white" />
                    <div className="col-span-1 col-start-1 mt-3 sm:col-span-2 sm:col-end-5 sm:mt-0">
                        <h1 className="font-semibold">Attention: </h1>
                        <p className="text-justify text-xs text-gray-400">
                            This website is operated by K&A insurance and is not
                            the Health Insurance Marketplace®️ website. In
                            offering this website, K&A insurance is required to
                            comply with all applicable Federal law, including
                            the standards established under 45 CFR 155.220 (c)
                            and (d) and standards established under 45 CFR
                            155.260 to protect the privacy and security of
                            personally identifiable information. This website
                            may not support enrollment in all Qualified Health
                            Plans (QHPs) being offered in your state through the
                            Health Insurance Marketplace®️ website. For
                            enrollment support in all available QHP options in
                            your state, go to the Health Insurance Marketplace®️
                            website at
                            <a
                                href="https://www.healthcare.gov/"
                                className="ml-1 text-sky-400 visited:text-purple-400 hover:underline"
                            >
                                HealthCare.gov
                            </a>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col-reverse items-center justify-between gap-y-2 border-t border-gray-600 pt-4 text-xs sm:flex-row">
                    <p>Copyrights © 2024.</p>
                    <div className="space-x-4">
                        <Link
                            to="/privacy-policy"
                            className="hover:text-blue-300 hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms-and-conditions"
                            className="hover:text-blue-300 hover:underline"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
