import { Album, ArrowUpFromDot, BellRing, Blocks, BookImage, BookOpenText, Calendar, ChartBarStacked, ChartNoAxesCombined, ChevronsRight, CircleUserRound, Earth, FlagTriangleRight, FolderClosed, Images, ImageUp, Layers, Layers2, LockKeyhole, Mail, Megaphone, PaintBucket, Send, Sparkles, SquareLibrary, TicketsPlane, Trash2, TriangleAlert, Upload, User, UserRound, UsersRound, Wrench } from "lucide-react";

export const homeRoutes: { title: string; href: string; description: string }[] = [
    {
        title: "Home",
        href: "/docs/primitives/alert-dialog",
        description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Book Flight",
        href: "/docs/primitives/hover-card",
        description:
        "For sighted users to preview content available behind a link.",
    },
    {
        title: "Flight Status",
        href: "/docs/primitives/progress",
        description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Trips and Destinations",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Collaborations",
        href: "/docs/primitives/tabs",
        description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Our COntact",
        href: "/docs/primitives/tooltip",
        description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export const subRoutes = [homeRoutes, homeRoutes, homeRoutes, homeRoutes ,homeRoutes];

export const adminRoutes = {
    entityRoutes: [
        {
            title: "Users",
            icon: User,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Countries",
            icon: Earth,
            children: [
                { title: "Countries", href: "countries" },
                { title: "Cities", href: "countries/cities" },
                { title: "Destinations", href: "countries/destinations" }
            ]
        },
        {
            title: "Bookings",
            icon: Album,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
    ],
    
    contentRoutes: [
        {
            title: "Posts",
            icon: ImageUp,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Pages",
            icon: BookOpenText,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Media Library",
            icon: Images,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
    ],

    analyticsRoutes: [
        {
            title: "Overview",
            icon: Sparkles,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Sources",
            icon: ArrowUpFromDot,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Events",
            icon: Calendar,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Reports",
            icon: Megaphone,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
    ],

    notificationRoutes: [
        {
            title: "All Notification",
            icon: BellRing,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Alerts",
            icon: TriangleAlert,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "User Message",
            icon: Mail,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Sent Messages",
            icon: Send,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
    ],

    filesRoutes: [
        {
            title: "Uploads",
            icon: Upload,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Folders",
            icon: FolderClosed,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Usage",
            icon: ChartNoAxesCombined,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Trash",
            icon: Trash2,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
    ],

    supportRoutes: [
        {
            title: "Community",
            icon: UsersRound,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Tickets",
            icon: TicketsPlane,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Categories",
            icon: Layers,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
    ],

    settingsRoutes: [
        {
            title: "Profile",
            icon: CircleUserRound,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "General",
            icon: Wrench,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Appearance",
            icon: PaintBucket,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Security",
            icon: LockKeyhole,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Integration",
            icon: Blocks,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
        {
            title: "Advanced",
            icon: ChevronsRight,
            children: [
                { title: "Create", href: "#" },
                { title: "Update", href: "#" },
                { title: "Delete", href: "#" },
            ]
        },
    ]
}
