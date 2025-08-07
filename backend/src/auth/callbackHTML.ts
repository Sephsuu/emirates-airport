export const callbackHTML: string = `
    <!DOCTYPE html>
        <html>
        <head>
            <title>Processing Authentication...</title>
        </head>
        <body>
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
                <div style="text-align: center;">
                    <h2>Processing authentication...</h2>
                    <p>Please wait while we redirect you.</p>
                </div>
            </div>
            
            <script>
                // Extract tokens from URL fragment
                const hash = window.location.hash.substring(1);
                const params = new URLSearchParams(hash);
                
                const accessToken = params.get('access_token');
                const refreshToken = params.get('refresh_token');
                const expiresIn = params.get('expires_in');
                const tokenType = params.get('token_type');
                
                if (accessToken) {
                    // Send tokens to your backend endpoint
                    fetch('/auth/session', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            expires_in: expiresIn,
                            token_type: tokenType
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Store your own JWT token if needed
                        if (data.token) {
                            localStorage.setItem('auth_token', data.token);
                        }
                        // Redirect to dashboard
                        window.location.href = 'http://localhost:3000/dashboard';
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        window.location.href = 'http://localhost:3000/login?error=auth_failed';
                    });
                } else {
                    // No access token found, redirect to login with error
                    window.location.href = 'http://localhost:3000/login?error=no_token';
                }
            </script>
        </body>
        </html>
`;