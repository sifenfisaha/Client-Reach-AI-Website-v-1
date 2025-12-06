/**
 * Analytics Utility
 * Fire-and-forget analytics tracking that doesn't block form submissions
 */

type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
};

/**
 * Track an analytics event
 * Fire-and-forget: never throws errors or blocks execution
 */
export function trackEvent(event: AnalyticsEvent): void {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const timestamp = new Date().toISOString();

    const eventData = {
      ...event,
      properties: {
        ...event.properties,
        timestamp,
      },
    };

    if (isDevelopment) {
      // Log to console in development
      console.log('[Analytics]', eventData);
    } else {
      // In production, send to analytics services
      // Check for common analytics tools
      
      // Google Analytics 4 (gtag)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.name, event.properties);
      }
      
      // PostHog
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture(event.name, event.properties);
      }
      
      // Plausible
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible(event.name, { props: event.properties });
      }
      
      // Custom analytics endpoint (if you have one)
      // Uncomment and configure if needed:
      // if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      //   fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(eventData),
      //   }).catch(() => {}); // Silently fail
      // }
    }
  } catch (error) {
    // Silently fail - analytics should never break functionality
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] Failed to track event:', error);
    }
  }
}

/**
 * Track newsletter subscription
 */
export function trackNewsletterSubscription(source: string = 'website'): void {
  trackEvent({
    name: 'newsletter_subscription',
    properties: {
      source,
    },
  });
}

/**
 * Track weekly insider subscription
 */
export function trackWeeklyInsiderSubscription(
  source: string = 'website',
  hasCompany: boolean = false,
  hasPhone: boolean = false
): void {
  trackEvent({
    name: 'weekly_insider_subscription',
    properties: {
      source,
      has_company: hasCompany,
      has_phone: hasPhone,
    },
  });
}

