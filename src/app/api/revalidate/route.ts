import { normalizeSlug, slugToPath } from '@/lib/slug';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST endpoint for Storyblok webhook
 * Revalidates cache based on the story that was published/unpublished
 *
 * Storyblok webhook payload includes:
 * - full_slug: The slug of the story (e.g., "global/header", "pages/about")
 * - action: published, unpublished, etc.
 */
export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    const body = raw ? JSON.parse(raw) : {};

    // console.log('Storyblok webhook received:', {
    //   action: body.action,
    //   full_slug: body.full_slug || body.story?.full_slug,
    // });

    // Extract slug from webhook payload
    const rawSlug = body.full_slug || body.story?.full_slug || body.slug || null;

    if (rawSlug) {
      // Normalize slug to remove trailing slash
      const normalizedSlug = normalizeSlug(rawSlug);

      // Revalidate by tag (matches cache tag in getCachedStoryblokData)
      revalidateTag(normalizedSlug, 'max');
      console.log(`✓ Revalidated tag: ${normalizedSlug}`);

      // Revalidate the actual page path in Next.js
      const pagePath = slugToPath(normalizedSlug);
      revalidatePath(pagePath);
      console.log(`✓ Revalidated path: ${pagePath}`);

      // Also revalidate with trailing slash variant (handles both /services and /services/)
      if (pagePath !== '/') {
        revalidatePath(`${pagePath}/`);
        console.log(`✓ Revalidated path: ${pagePath}/`);
      }

      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        slug: normalizedSlug,
        path: pagePath,
      });
    } else {
      // If no specific slug, revalidate everything
      revalidatePath('/', 'layout');
      revalidateTag('storyblok', 'max');
      console.log('✓ Revalidated all content');

      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        slug: 'all',
      });
    }
  } catch (err) {
    console.error('❌ Revalidation error:', err);
    return NextResponse.json(
      {
        revalidated: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}

/**
 * GET endpoint for manual cache clearing
 * Useful for testing or manual cache invalidation
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawSlug = searchParams.get('slug');

    if (rawSlug) {
      // Normalize and revalidate specific slug
      const normalizedSlug = normalizeSlug(rawSlug);

      revalidateTag(normalizedSlug, 'max');
      console.log(`✓ Manually revalidated tag: ${normalizedSlug}`);

      const pagePath = slugToPath(normalizedSlug);
      revalidatePath(pagePath);
      console.log(`✓ Manually revalidated path: ${pagePath}`);

      if (pagePath !== '/') {
        revalidatePath(`${pagePath}/`);
        console.log(`✓ Manually revalidated path: ${pagePath}/`);
      }

      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        slug: normalizedSlug,
        path: pagePath,
        message: `Cache cleared for: ${normalizedSlug}`,
      });
    } else {
      // Revalidate everything
      revalidatePath('/', 'layout');
      revalidateTag('storyblok', 'max');
      console.log('✓ Manually revalidated all content');

      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        slug: 'all',
        message: 'All cache cleared successfully',
      });
    }
  } catch (err) {
    console.error('❌ Manual revalidation error:', err);
    return NextResponse.json(
      {
        revalidated: false,
        message: 'Error clearing cache',
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
