'use client';

import * as React from 'react';
import { AudioWaveform, BookOpen, Bot, Command, GalleryVerticalEnd, SquareTerminal } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

// This is sample data.
const data = {
    user: {
        name: 'Guest',
        email: 'This is guest mode.',
        avatar: '',
    },
    teams: [
        {
            name: 'DockWatch',
            logo: GalleryVerticalEnd,
            plan: 'jin-network',
        },
    ],
    navMain: [
        {
            title: '서버',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: '사용량',
                    url: '/server/usage',
                },
                {
                    title: '네트워크',
                    url: '/server/network',
                },
                {
                    title: '파일',
                    url: '/server/disk',
                },
            ],
        },
        {
            title: '로그',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: '실시간 로그',
                    url: '#',
                },
                {
                    title: '로그 보기',
                    url: '#',
                },
            ],
        },
        {
            title: '컨테이너',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: '배포 상태',
                    url: '#',
                },
                {
                    title: '실행 제어',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
