'use client';

import dynamic from 'next/dynamic';

// ssr: false는 client component에서만 허용되므로 여기서 처리
const DynamicBreadcrumb = dynamic(() => import('./DynamicBreadcrumb'), {
    ssr: false,
});

export default function DynamicBreadcrumbWrapper() {
    return <DynamicBreadcrumb />;
}
