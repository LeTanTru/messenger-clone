# Messenger Clone

A full-featured real-time messaging application built with modern web technologies. This app supports 1-on-1 chats, group conversations, image sharing, online presence tracking, and OAuth authentication.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Database | MongoDB with Prisma ORM |
| Authentication | NextAuth.js (Credentials, GitHub, Google) |
| Real-Time | Pusher |
| State Management | Zustand |
| Form Handling | React Hook Form |
| Styling | Tailwind CSS 4 |
| UI Components | Headless UI |
| Image Upload | Cloudinary |
| Notifications | React Hot Toast |

## Features

- **Authentication**: Email/password registration + OAuth (GitHub, Google)
- **Real-time Messaging**: Instant message delivery via Pusher
- **Online Status**: Live presence tracking with green indicators
- **Group Chats**: Create conversations with multiple participants
- **Image Sharing**: Upload and send images via Cloudinary
- **Message Read Receipts**: "Seen by" indicators
- **Responsive Design**: Desktop sidebar + mobile footer navigation
- **User Profiles**: Update name and avatar image

## Project Structure

```
app/
├── (site)/                    # Public routes (auth page)
│   ├── page.tsx              # Landing/auth page
│   └── _components/
│       ├── auth-form.tsx     # Login/Register form
│       └── auth-social-button.tsx
├── actions/                   # Server actions
│   ├── get-current-user.ts
│   ├── get-session.ts
│   ├── get-users.ts
│   ├── get-conversations.ts
│   ├── get-conversation-by-id.ts
│   └── get-messages.ts
├── api/                       # API Routes
│   ├── auth/[...nextauth]/   # NextAuth handler
│   ├── register/             # User registration
│   ├── settings/             # Profile updates
│   ├── pusher/auth/          # Pusher authorization
│   ├── conversations/        # Conversation CRUD
│   └── messages/             # Message creation
├── components/               # Shared UI components
│   ├── avatar.tsx
│   ├── avatar-group.tsx
│   ├── button.tsx
│   ├── modal.tsx
│   ├── empty-state.tsx
│   ├── loading-modal.tsx
│   ├── active-status.tsx
│   ├── input/
│   │   ├── input.tsx
│   │   └── select.tsx
│   └── sidebar/
│       ├── sidebar.tsx
│       ├── desktop-sidebar.tsx
│       ├── desktop-item.tsx
│       ├── mobile-footer.tsx
│       ├── mobile-item.tsx
│       └── settings-modal.tsx
├── context/                  # React Context providers
│   ├── auth-context.tsx     # SessionProvider wrapper
│   └── toaster-context.tsx  # Toast notifications
├── hooks/                    # Custom React hooks
│   ├── use-active-channel.ts
│   ├── use-active-list.ts
│   ├── use-conversation.ts
│   ├── use-other-user.ts
│   └── use-routes.ts
├── conversations/            # Conversation feature
│   ├── page.tsx             # Conversation list
│   ├── layout.tsx
│   ├── _components/
│   │   ├── conversation-list.tsx
│   │   ├── conversation-box.tsx
│   │   └── group-chat-modal.tsx
│   └── [conversationId]/
│       ├── page.tsx         # Individual chat view
│       ├── loading.tsx
│       └── _components/
│           ├── body.tsx     # Messages container
│           ├── form.tsx     # Message input
│           ├── header.tsx
│           ├── message-box.tsx
│           ├── message-input.tsx
│           ├── profile-drawer.tsx
│           ├── confirm-modal.tsx
│           └── image-modal.tsx
├── users/                    # Users directory
│   ├── page.tsx
│   ├── layout.tsx
│   └── _components/
│       ├── user-list.tsx
│       └── user-box.tsx
├── layout.tsx               # Root layout
└── globals.css              # Tailwind styles

lib/
├── prisma.ts               # Prisma client singleton
├── pusher.ts               # Pusher server instance
└── pusher-client.ts        # Pusher client singleton

prisma/
└── schema.prisma          # Database schema

types/
└── index.ts                # TypeScript types
```

## Database Schema

```
User
├── id, name, email, image, hashedPassword
├── conversationIds[], seenMessageIds[]
└── relations: conversations, seenMessages, accounts, messages

Conversation
├── id, name, isGroup, lastMessageAt
├── userIds[], messageIds[]
└── relations: users, messages

Message
├── id, body, image, createdAt
├── seenIds[], conversationId, senderId
└── relations: conversation, sender, seen

Account (NextAuth)
└── OAuth account linkage
```

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | ALL | NextAuth authentication |
| `/api/register` | POST | Create new user account |
| `/api/settings` | POST | Update user profile |
| `/api/pusher/auth` | POST | Pusher channel authorization |
| `/api/conversations` | POST | Create conversation (1-on-1 or group) |
| `/api/conversations/[id]` | DELETE | Delete conversation |
| `/api/conversations/[id]/seen` | POST | Mark messages as seen |
| `/api/messages` | POST | Send new message |

## Real-Time Events (Pusher)

| Event | Channel | Purpose |
|-------|---------|---------|
| `messages:new` | conversationId | New message broadcast |
| `message:update` | conversationId | Message seen status update |
| `conversation:new` | user email | New conversation notification |
| `conversation:update` | user email | Conversation update |
| `conversation:remove` | user email | Conversation deletion |
| `pusher:subscription_succeeded` | presence-messenger | Initial online users |
| `pusher:member_added` | presence-messenger | User came online |
| `pusher:member_removed` | presence-messenger | User went offline |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Pusher account
- Cloudinary account (for image uploads)
- GitHub OAuth app (optional)
- Google OAuth app (optional)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="mongodb://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GITHUB_ISSUER="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"

# Pusher
PUSHER_APP_ID="your-pusher-app-id"
NEXT_PUBLIC_PUSHER_APP_KEY="your-pusher-app-key"
PUSHER_APP_SECRET="your-pusher-app-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
```

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Key Implementation Details

### Authentication Flow

1. Users can register with email/password or sign in via GitHub/Google OAuth
2. Sessions are JWT-based with NextAuth.js
3. Protected routes use server-side session checks in server actions
4. `AuthContext` wraps the app with `SessionProvider`

### Real-Time Messaging

1. Pusher client connects on browser with authorization endpoint
2. Each conversation has its own channel for message events
3. Presence channel (`presence-messenger`) tracks online users
4. Zustand store maintains online user list for UI updates

### State Management

- **Server State**: Prisma/MongoDB for persistent data
- **Client State**: Zustand for online user tracking
- **Session**: NextAuth for authentication state
- **Forms**: React Hook Form for form handling

## License

MIT