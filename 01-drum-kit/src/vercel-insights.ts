import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

export function initVercelInsights() {
  injectAnalytics();
  injectSpeedInsights();
}