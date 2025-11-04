// This file is a temporary API endpoint to manually set premium metadata.
// It should be removed once the full Clerk Webhook handler is configured and working.

import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

/**
 * Handles a manual POST request from the client to set the 'premium' flag
 * on the user's public metadata directly using the Clerk backend SDK.
 */
export async function POST(req: Request) {
    try {
        const { userId } = await req.json();

        if (!userId || typeof userId !== 'string') {
            return new NextResponse(JSON.stringify({ error: 'Missing or invalid userId' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // --- CORE FIX LOGIC ---
        // This is the server-side code that executes the exact fix we need:
        // Updating the user's public metadata.
        const updatedUser = await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                premium: true, // Manually set the flag that the PremiumGate checks for
            },
        });
        // --- END CORE FIX LOGIC ---

        // Log the change
        console.log(`Manual Premium Activated for User ID: ${userId}`);
        console.log(`New Metadata:`, updatedUser.publicMetadata);


        return new NextResponse(JSON.stringify({ 
            success: true, 
            message: 'Premium flag set successfully via manual endpoint.' 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error during manual premium activation:', error);

        // Return a detailed error response
        return new NextResponse(JSON.stringify({ 
            success: false, 
            error: 'Failed to update Clerk metadata. Check server logs.' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
