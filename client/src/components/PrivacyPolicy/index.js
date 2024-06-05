import Layout from '../Layout'

const PrivacyPolicy = () => {
    return (
        <Layout title="Privacy Policy">
            <div className="mx-auto w-11/12 pb-10 md:w-2/3">
                <h4 className="mb-3 text-center font-semibold text-red-600">
                    Effective Date: 04/20/2024
                </h4>
                <p>
                    Welcome to K&A insurance Agency's Privacy Policy. We are
                    committed to protecting the privacy and security of your
                    personal information. This Privacy Policy outlines the types
                    of personal information we collect, how we use and safeguard
                    that information, and your rights regarding your personal
                    data.
                </p>
                <h4 className="my-3 font-semibold text-blue-800">
                    1.⁠ ⁠Information We Collect
                </h4>
                <p>
                    We collect various types of personally identifiable
                    information (PII) from individuals who utilize our insurance
                    services. This information may include:
                </p>
                <ul className="my-3 text-sm">
                    <li>
                        <span className="font-semibold">
                            Contact Information:
                        </span>
                        Such as names, addresses, email addresses, and phone
                        numbers.
                    </li>
                    <li>
                        <span className="font-semibold">
                            Social Security Number:
                        </span>
                        When necessary for insurance applications, claims
                        processing, and compliance with regulatory requirements.
                    </li>
                    <li>
                        <span className="font-semibold">
                            Income Information:
                        </span>
                        To assess insurance eligibility and coverage options,
                        including salary, wages, and other sources of income.
                    </li>
                    <li>
                        <span className="font-semibold">
                            Dependent Information:
                        </span>
                        Including names, dates of birth, and relationship to
                        policyholders.
                    </li>
                </ul>
                <p>
                    Additionally, we may collect information automatically when
                    you interact with our website or mobile applications, such
                    as IP addresses, browser type, and browsing behavior.
                </p>
                <h4 className="my-3 font-semibold text-blue-800">
                    2. How We Use Your Information
                </h4>
                <p>
                    We use the collected information for the following purposes:
                </p>
                <ul className="my-3 text-sm">
                    <li>
                        <span className="font-semibold">
                            Providing Insurance Services:
                        </span>{' '}
                        Including processing insurance applications,
                        underwriting policies, and managing claims.
                    </li>
                    <li>
                        <span className="font-semibold">Personalization:</span>{' '}
                        Tailoring our services and communications to meet your
                        specific needs and preferences.
                    </li>
                    <li>
                        <span className="font-semibold">Communication:</span>{' '}
                        Sending you important updates, service notifications,
                        and promotional offers.
                    </li>
                    <li>
                        <span className="font-semibold">Compliance:</span>{' '}
                        Fulfilling legal and regulatory obligations, such as
                        identity verification and fraud prevention.
                    </li>
                </ul>
                <h4 className="my-3 font-semibold text-blue-800">
                    3. Information Sharing and Disclosure
                </h4>
                <p>
                    We may share your personal information with the following
                    categories of recipients:
                </p>
                <ul className="my-3 text-sm">
                    <li>
                        <span className="font-semibold">
                            Insurance Underwriters and Carriers:
                        </span>{' '}
                        To facilitate the issuance and management of insurance
                        policies.
                    </li>
                    <li>
                        <span className="font-semibold">
                            Service Providers:
                        </span>{' '}
                        Including third-party vendors who assist us in
                        delivering our services, such as IT providers, marketing
                        agencies, and customer support services.
                    </li>
                    <li>
                        <span className="font-semibold">
                            Regulatory Authorities and Law Enforcement:
                        </span>{' '}
                        When required by law or in response to legal requests,
                        such as subpoenas, court orders, or government
                        inquiries.
                    </li>
                </ul>
                <p>
                    We do not sell or rent your personal information to third
                    parties for marketing purposes.
                </p>
                <h4 className="my-3 font-semibold text-blue-800">
                    4. Data Security
                </h4>
                <p>
                    We maintain appropriate technical, administrative, and
                    physical safeguards to protect your personal information
                    from unauthorized access, disclosure, alteration, or
                    destruction. These measures include encryption, access
                    controls, and regular security assessments.
                </p>
                <h4 className="my-3 font-semibold text-blue-800">
                    5. Your Rights and Choices
                </h4>
                <p>
                    Subject to applicable laws, you may have the following
                    rights regarding your personal information:
                </p>
                <ul className="my-3 text-sm">
                    <li>
                        <span className="font-semibold">Access:</span> Request
                        access to the personal information we hold about you and
                        receive a copy of such data.
                    </li>
                    <li>
                        <span className="font-semibold">Correction:</span>{' '}
                        Update or correct inaccuracies in your personal
                        information.
                    </li>
                    <li>
                        <span className="font-semibold">Deletion:</span> Request
                        deletion of your personal information, subject to legal
                        exceptions.
                    </li>
                    <li>
                        <span className="font-semibold">Opt-Out:</span> Choose
                        not to receive marketing communications from us by
                        following the instructions provided in our
                        communications.
                    </li>
                </ul>
                <h4 className="my-3 font-semibold text-blue-800">
                    6. Children's Privacy
                </h4>
                <p>
                    Our services are not directed to individuals under the age
                    of 18. We do not knowingly collect personal information from
                    children without parental consent.
                </p>
                <h4 className="my-3 font-semibold text-blue-800">
                    7. Changes to This Policy
                </h4>
                <p>
                    We may update this Privacy Policy periodically to reflect
                    changes in our practices or legal requirements. We will
                    notify you of any material changes by posting the updated
                    policy on our website or through other means.
                </p>
                <h4 className="my-3 font-semibold text-blue-800">
                    8. Contact Us
                </h4>
                <p>
                    If you have any questions or concerns about this Privacy
                    Policy or our data practices, please contact us at{' '}
                    <a
                        href="mailto:kierra@kainsurance.net"
                        className="text-blue-600 underline visited:text-purple-600 hover:underline"
                    >
                        kierra@kainsurance.net
                    </a>
                    .
                </p>
            </div>
        </Layout>
    )
}

export default PrivacyPolicy
