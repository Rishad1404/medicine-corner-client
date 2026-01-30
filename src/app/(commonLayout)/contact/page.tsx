

import ContactUs from '@/components/shadcn-studio/blocks/contact-us-page-01/ContactPage'
import { Clock8Icon, MapPinIcon, BriefcaseBusinessIcon, PhoneIcon } from 'lucide-react'



const contactInfo = [
  {
    title: 'Office Hours',
    icon: Clock8Icon,
    description: 'Monday-Friday\n8:00 am to 5:00 pm'
  },
  {
    title: 'Our Address',
    icon: MapPinIcon,
    description: 'Sadar, Dinajpur-5200, Rangpur'
  },
  {
    title: 'Office 2',
    icon: BriefcaseBusinessIcon,
    description: 'Mirpur-10, Dhaka, Bangladesh'
  },
  {
    title: 'Get in Touch',
    icon: PhoneIcon,
    description: '+8801940103624\n+8801744742404'
  }
]

const ContactUsPage = () => {
  return <ContactUs contactInfo={contactInfo} />
}

export default ContactUsPage
