import React from "react"
import Layout from "../../components/Layout"

const TermsAndConditions = () => {
    return (
        <Layout title='Terms and Conditions'>
            <div className="w-11/12 md:w-2/3 mx-auto pb-10">
                <p>
                    These Terms and Conditions
                    <span className="bg-primary p-1 text-sm font-semibold mx-1">"Terms"</span>
                    outline the eligibility criteria and requirements for individuals seeking to enroll in the Zero Monthly Premium insurance plan 
                    <span className="bg-primary p-1 text-sm font-semibold mx-1">"Plan"</span>
                    provided by K&A insurance Agency 
                    <span className="bg-primary p-1 text-sm font-semibold mx-1">"we", "us", or "our"</span>
                    . By submitting an application for enrollment in the Plan, you acknowledge and agree to comply with these Terms.
                </p>
                <h4 className="text-secondary font-semibold my-3">1. Eligibility Criteria</h4>
                <p>
                    To qualify for enrollment in the Zero Monthly Premium plan, applicants must meet the following eligibility criteria:
                </p>
                <ul className="text-sm my-3">
                    <li>
                        <span className="font-semibold">Income Qualification:</span>
                        Applicants must meet income eligibility requirements based on federal and/or state guidelines. Income eligibility thresholds may vary depending on household size, geographic location, and applicable program rules.
                    </li>
                    <li>
                        <span className="font-semibold">Household Size:</span>
                        The size of the applicant's household will be determined based on individuals claimed on the applicant's tax return, including dependents and other individuals for whom the applicant provides financial support. Documentation may be required to verify household size.
                    </li>
                    <li>
                        <span className="font-semibold">Tax Filing Status:</span>
                        Applicants must either file taxes or be tax-exempt. Proof of tax filing status, including copies of recent tax returns or proof of tax-exempt status, may be required during the application process.
                    </li>
                    <li>
                        <span className="font-semibold">Residency:</span>
                        Applicants must be legal residents of the geographic area serviced by K&A insurance Agency and eligible for enrollment in the offered insurance plans.
                    </li>
                </ul>
                <h4 className="text-secondary font-semibold my-3">2. Income Verification Process</h4>
                <p>
                    Applicants will be required to provide documentation to verify their income as part of the application process. Acceptable forms of income verification may include, but are not limited to:
                </p>
                <ul className="text-sm my-3">
                    <li>
                        Recent tax returns (e.g., Form 1040)
                    </li>
                    <li>
                        Pay stubs or income statements
                    </li>
                    <li>
                        Bank statements or other financial records
                    </li>
                </ul>
                <p>
                    Failure to provide sufficient income verification may result in ineligibility for the Zero Monthly Premium plan.
                </p>
                <h4 className="text-secondary font-semibold my-3">3. Household Size Determination</h4>
                <p>
                    Household size will be determined based on the number of individuals claimed on the applicant's tax return, as well as any additional dependents or household members for whom the applicant provides financial support. Documentation, such as birth certificates or court documents, may be required to verify household composition.
                </p>
                <h4 className="text-secondary font-semibold my-3">4. Tax Filing Status Verification</h4>
                <p>
                    Applicants must provide documentation to verify their tax filing status, including copies of recent tax returns or proof of tax-exempt status. Failure to provide adequate documentation may result in denial of enrollment in the Zero Monthly Premium plan.
                </p>
                <h4 className="text-secondary font-semibold my-3">5. Possibility of Monthly Premiums</h4>
                <p>
                    While the Zero Monthly Premium plan offers coverage without a monthly premium for eligible individuals, it is important to note that some plans offered by K&A insurance Agency may have a monthly premium based on factors such as income, household size, and tax filing status. Applicants should review plan details carefully to understand any applicable premium amounts.
                </p>
                <h4 className="text-secondary font-semibold my-3">6. Contact Consent</h4>
                <p>
                    By submitting an application for enrollment in the Zero Monthly Premium plan, you consent to K&A insurance Agency contacting you via phone and email for purposes related to your enrollment and ongoing communication regarding your insurance coverage.
                </p>
                <h4 className="text-secondary font-semibold my-3">7. Changes in Eligibility Status</h4>
                <p>
                    Applicants who experience changes in income, household size, or tax filing status after enrollment in the Zero Monthly Premium plan are required to notify K&A insurance Agency promptly. Changes in eligibility status may affect plan coverage and premium amounts, and failure to report changes may result in termination of coverage.
                </p>
                <h4 className="text-secondary font-semibold my-3">8. Compliance with Laws and Regulations</h4>
                <p>
                    Enrollment in the Zero Monthly Premium plan is subject to compliance with all applicable federal, state, and local laws, regulations, and guidelines governing health insurance coverage. K&A insurance Agency reserves the right to verify eligibility and enforce compliance with these Terms and applicable laws and regulations.
                </p>
                <h4 className="text-secondary font-semibold my-3">9. Disclaimers</h4>
                <p>
                    Enrollment in the Zero Monthly Premium plan is subject to availability and may be limited based on factors such as plan capacity, funding constraints, and regulatory requirements. K&A insurance Agency reserves the right to modify or terminate the Zero Monthly Premium plan or these Terms at any time without prior notice, subject to applicable law.
                </p>
                <h4 className="text-secondary font-semibold my-3">10. Contact Information</h4>
                <p>
                    If you have any questions or concerns regarding eligibility for the Zero Monthly Premium plan or these Terms, please contact us at <a href="mailto:kierra@kainsurance.net" className='text-blue-600 hover:underline visited:text-purple-600 underline'>kierra@kainsurance.net</a>.
                </p>
            </div>
        </Layout>
    )
}

export default TermsAndConditions