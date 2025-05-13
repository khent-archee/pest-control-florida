import { Card, CardContent } from "@/components/ui/card";
import { WEBSITE_NAME } from "../constant";

const textStyles = {
  h1: "text-4xl font-bold mb-10 text-center text-primary",
  h2: "text-2xl font-bold mb-4 text-primary-light",
  h3: "text-xl font-bold mb-4 text-primary-light",
  p: "mb-4 text-base text-slate-900",
  ul: "list-disc ml-6 md:ml-12 mb-4 text-base text-slate-900",
  a: "underline text-blue-500",
};

export const generateMetadata = () => {
  return {
    title: `Privacy Policy - ${WEBSITE_NAME}`,
  };
};

export default function PrivacyPolicy() {
  return (
    <main className="flex flex-col gap-10 p-2 md:p-5 mt-4 md:mt-6 max-w-4xl w-full shadow-sm">
      <Card className="px-2 md:px-5 py-8 rounded-xl">
        <CardContent>
          <h1 className={textStyles.h1}>Privacy Policy</h1>
          <p className={textStyles.p}>
            <strong>Effective date: April 28, 2025</strong>
          </p>

          <p className={textStyles.p}>
            Your Escape Room ("us", "we", or "our") operates the
            https://yourescaperoom.com website (the "Service").
          </p>
          <p className={textStyles.p}>
            This page informs you of our policies regarding the collection, use,
            and disclosure of personal data when you use our Service and the
            choices you have associated with that data.
          </p>
          <p className={textStyles.p}>
            By using the Service, you agree to the practices described in this
            policy. Unless otherwise defined in this Privacy Policy, terms used
            in this Privacy Policy have the same meanings as in our Terms and
            Conditions, accessible from https://yourescaperoom.com
          </p>

          <h2 className={textStyles.h2}>Information Collection</h2>
          <p className={textStyles.p}>
            Our website primarily functions as a directory for escape rooms. We
            aim to collect minimal personal information while providing our
            service.
          </p>

          <h2 className={textStyles.h2}>Types Of Data Collected</h2>
          <h3 className={textStyles.h3}>Usage Data</h3>
          <p className={textStyles.p}>
            We automatically collect certain information when you visit our
            website, such as your browser type, IP address, the pages you visit,
            the time and date of your visit, and the time spent on those pages.
            This information helps us understand how visitors use our website
            and improve the user experience. This data is not personally
            identifiable.
          </p>

          <h3 className={textStyles.h3}>Cookies</h3>
          <p className={textStyles.p}>
            Our website may use "cookies" to enhance user experience. You can
            choose to set your browser to refuse all cookies or to indicate when
            a cookie is being sent. However, if you do not accept cookies, you
            may not be able to use some portions of our Service.
          </p>

          <h2 className={textStyles.h2}>Use Of Information</h2>
          <p className={textStyles.p}>
            Your Escape Room uses the information we collect for the following
            purposes only:
          </p>
          <ul className={textStyles.ul}>
            <li>To provide and maintain our Service</li>
            <li>
              To improve our website based on how visitors browse and interact
              with it
            </li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className={textStyles.h2}>Links To Other Sites</h2>
          <p className={textStyles.p}>
            Our Service contains links to other escape room websites and
            businesses that are not operated by us. If you click on a
            third-party link, you will be directed to that third party's site.
            We strongly advise you to review the Privacy Policy of every site
            you visit.
          </p>
          <p className={textStyles.p}>
            We have no control over and assume no responsibility for the
            content, privacy policies, or practices of any third-party sites or
            services.
          </p>

          <h2 className={textStyles.h2}>Security</h2>
          <p className={textStyles.p}>
            The security of any information is important to us, but remember
            that no method of transmission over the Internet is 100% secure.
            While we strive to protect your information, we cannot guarantee its
            absolute security.
          </p>

          <h2 className={textStyles.h2}>Third-Party Services</h2>
          <p className={textStyles.p}>
            We may use third-party services such as Google Analytics to help us
            understand how our site is used. These services may collect
            information sent by your browser as part of a web page request, such
            as cookies or your IP address. Their use of this information is
            governed by their respective privacy policies.
          </p>

          <h2 className={textStyles.h2}>Children's Privacy</h2>
          <p className={textStyles.p}>
            Our Service does not address anyone under the age of 18
            ("Children").
          </p>
          <p className={textStyles.p}>
            We do not knowingly collect personally identifiable information from
            anyone under the age of 18. If you are a parent or guardian and you
            are aware that your child has provided us with Personal Data, please
            contact us. If we become aware that we have collected Personal Data
            from children without verification of parental consent, we take
            steps to remove that information from our servers.
          </p>

          <h2 className={textStyles.h2}>Changes To This Privacy Policy</h2>
          <p className={textStyles.p}>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className={textStyles.p}>
            We will update the "effective date" at the top of this Privacy
            Policy. You are advised to review this Privacy Policy periodically
            for any changes. Changes to this Privacy Policy are effective when
            they are posted on this page.
          </p>

          <h2 className={textStyles.h2}>Contact Us</h2>
          <p className={textStyles.p}>
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className={textStyles.ul}>
            <li>By email: info@yourescaperoom.com</li>
            <li>
              By visiting our contact page:
              <a
                href="https://yourescaperoom.com/contact-us/"
                className={textStyles.a}
              >
                https://yourescaperoom.com/contact-us/
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
