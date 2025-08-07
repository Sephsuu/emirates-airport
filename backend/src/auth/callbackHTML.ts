export const callbackHTML: string = `
    <html>
            <head>
                <title>Processing Authentication...</title>
            </head>
            <body>
                <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                    <h2>Processing Authentication...</h2>
                    <div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 20px auto;"></div>
                    <p id="status">Extracting tokens...</p>
                </div>
                
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
                
                <script>
                    console.log('Full URL:', window.location.href);
                    console.log('Hash:', window.location.hash);
                    
                    function updateStatus(message) {
                        document.getElementById('status').textContent = message;
                    }
                    
                    async function processAuth() {
                        try {
                            updateStatus('Extracting tokens from URL...');
                            
                            // Extract tokens from hash fragment
                            const hash = window.location.hash.substring(1); // Remove the #
                            console.log('Hash content:', hash);
                            
                            if (!hash) {
                                throw new Error('No hash fragment found in URL');
                            }
                            
                            // Parse hash parameters
                            const params = new URLSearchParams(hash);
                            
                            const tokens = {
                                access_token: params.get('access_token'),
                                refresh_token: params.get('refresh_token'),
                                expires_in: params.get('expires_in') || '3600',
                                token_type: params.get('token_type') || 'bearer'
                            };
                            
                            console.log('Extracted tokens:', {
                                access_token: tokens.access_token ? tokens.access_token.substring(0, 20) + '...' : null,
                                refresh_token: tokens.refresh_token ? tokens.refresh_token.substring(0, 20) + '...' : null,
                                expires_in: tokens.expires_in,
                                token_type: tokens.token_type
                            });
                            
                            if (!tokens.access_token) {
                                throw new Error('No access token found in URL hash');
                            }
                            
                            updateStatus('Creating session...');
                            
                            // Create session with tokens
                            const sessionResponse = await fetch('/auth/session', {
                                method: 'POST',
                                headers: { 
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(tokens)
                            });
                            
                            console.log('Session response status:', sessionResponse.status);
                            
                            if (!sessionResponse.ok) {
                                const errorText = await sessionResponse.text();
                                console.error('Session error response:', errorText);
                                throw new Error(\`Session creation failed: \${sessionResponse.status} - \${errorText}\`);
                            }
                            
                            const sessionData = await sessionResponse.json();
                            console.log('Session created successfully!');
                            
                            updateStatus('Authentication successful! Redirecting...');
                            
                            // Store your app's JWT token
                            localStorage.setItem('authToken', sessionData.token);
                            
                            // Clear the URL hash to remove tokens from browser history
                            history.replaceState(null, null, window.location.pathname);
                            
                            // Redirect to your app
                            setTimeout(() => {
                                window.location.href = '/dashboard'; // Change to your app's main page
                            }, 1000);
                            
                        } catch (error) {
                            console.error('Authentication error:', error);
                            updateStatus('Authentication failed');
                            
                            document.body.innerHTML = \`
                                <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                                    <h2>Authentication Failed</h2>
                                    <p style="color: red; margin: 20px 0;">\${error.message}</p>
                                    <button onclick="window.location.href='/login'" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                                        Try Again
                                    </button>
                                </div>
                            \`;
                        }
                    }
                    
                    // Start processing immediately
                    processAuth();
                </script>
            </body>
        </html>
`;

