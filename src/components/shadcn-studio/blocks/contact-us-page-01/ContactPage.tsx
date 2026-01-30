import type { ComponentType } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type ContactInfo = {
  title: string
  icon: ComponentType
  description: string
}[]

const ContactUs = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        
        {/* Header */}
        <div className='relative mx-auto mb-8 w-fit sm:mb-16 lg:mb-10'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Contact Us</h2>
          <span className='bg-primary absolute top-9 left-0 h-px w-full'></span>
        </div>

        {/* Top Section: Image + Contact Form */}
        <div className='grid items-center gap-8 lg:grid-cols-2 mb-16'>
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/contact-us/image-1.png'
            alt='Contact illustration'
            className='size-full rounded-md object-cover max-lg:max-h-70'
          />

          <div>
            <h3 className='mb-6 text-2xl font-semibold'>Get in touch!</h3>
            <p className='text-muted-foreground mb-8 text-lg font-medium'>
              Have a question about an order or a specific medicine? Our pharmacists are here to assist you.
            </p>

            {/* 👇 UPDATED: Form Section with Name & Email */}
            <div className="space-y-4">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Message Box */}
              <textarea 
                placeholder="Write your message here..."
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              
              {/* Send Button */}
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Send Message
              </button>
            </div>
            {/* 👆 End of Form Section */}

          </div>
        </div>

        {/* Bottom Section: Contact Info Cards (One Line) */}
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          {contactInfo.map((info, index) => (
            <Card className='border-none shadow-none' key={index}>
              <CardContent className='flex flex-col items-center gap-4 text-center'>
                <Avatar className='size-9 border'>
                  <AvatarFallback className='bg-transparent [&>svg]:size-5'>
                    <info.icon />
                  </AvatarFallback>
                </Avatar>
                <div className='space-y-3'>
                  <h4 className='text-lg font-semibold'>{info.title}</h4>
                  <div className='text-muted-foreground text-base font-medium'>
                    {info.description.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ContactUs