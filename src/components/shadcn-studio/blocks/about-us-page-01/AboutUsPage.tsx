import { ShieldCheck, Truck, HeartHandshake, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AboutUs = () => {
  return (
    <section className='bg-background py-12 sm:py-20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        
        {/* 1. Header Section */}
        <div className='mx-auto mb-16 max-w-3xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            About Medicine Corner
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            We are more than just an online pharmacy. We are your partners in health, 
            dedicated to ensuring that genuine healthcare is accessible, affordable, and 
            delivered with care.
          </p>
        </div>

        {/* 2. Mission & Story (Text Layout) */}
        <div className='grid gap-10 lg:grid-cols-2 lg:gap-16 items-center mb-20'>
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold'>Our Story</h3>
            <p className='text-muted-foreground leading-relaxed'>
              Medicine Corner started with a simple idea: getting essential medication should not be a struggle. 
              In a world where traffic and busy schedules make visiting a pharmacy difficult, we built a digital solution.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Today, we serve thousands of families, bridging the gap between pharmacists and patients through technology.
            </p>
          </div>
          
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold'>Our Mission</h3>
            <p className='text-muted-foreground leading-relaxed'>
              Our mission is to democratize healthcare access. We believe that distance or time should never 
              prevent someone from getting the life-saving medicine they need.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              We are committed to selling <strong>only 100% genuine products</strong>, sourced directly from 
              reputable manufacturers, ensuring safety above all else.
            </p>
          </div>
        </div>

        {/* 3. Core Values (Grid) */}
        <div className='space-y-8'>
          <div className='text-center mb-10'>
            <h3 className='text-2xl font-bold'>Why People Trust Us</h3>
          </div>
          
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {/* Value 1 */}
            <Card>
              <CardHeader>
                <ShieldCheck className='size-10 text-primary mb-2' />
                <CardTitle>100% Genuine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  We never compromise on quality. Every pill and bottle is sourced from certified manufacturers.
                </p>
              </CardContent>
            </Card>

            {/* Value 2 */}
            <Card>
              <CardHeader>
                <Truck className='size-10 text-primary mb-2' />
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  Urgency matters in healthcare. Our logistics network ensures your medicine reaches you on time.
                </p>
              </CardContent>
            </Card>

            {/* Value 3 */}
            <Card>
              <CardHeader>
                <HeartHandshake className='size-10 text-primary mb-2' />
                <CardTitle>Expert Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  Our team of registered pharmacists is available to answer your queries and guide your dosage.
                </p>
              </CardContent>
            </Card>

            {/* Value 4 */}
            <Card>
              <CardHeader>
                <Clock className='size-10 text-primary mb-2' />
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  Health issues do not watch the clock. Our support team is ready to assist you anytime, day or night.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutUs