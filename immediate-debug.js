// IMMEDIATE HEADER DEBUG - Check what's actually being sent
async function checkCurrentHeaders() {
    try {
        console.log('🔍 Checking current headers from production...');
        
        const response = await fetch('https://khesed-tek-systems.org/contact', {
            method: 'HEAD',
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            }
        });
        
        console.log('📡 Response Headers:');
        for (let [key, value] of response.headers.entries()) {
            if (key.toLowerCase().includes('permission')) {
                console.log(`🚫 ${key}: ${value}`);
            }
        }
        
        // Check for any permissions policy
        const permissionsPolicy = response.headers.get('permissions-policy');
        if (permissionsPolicy) {
            console.log(`🔒 Current Permissions-Policy: ${permissionsPolicy}`);
            if (permissionsPolicy.includes('geolocation=()')) {
                console.log('❌ STILL BLOCKED - Restrictive policy active');
            } else {
                console.log('✅ Policy looks good');
            }
        } else {
            console.log('ℹ️ No Permissions-Policy header found');
        }
        
        return response.headers;
    } catch (error) {
        console.error('Error checking headers:', error);
    }
}

// Run the check
checkCurrentHeaders();