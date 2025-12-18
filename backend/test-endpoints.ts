// Test script for Supabase Edge Functions
// Run with: deno run --allow-net --allow-env test-endpoints.ts

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'http://localhost:54321';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || '';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'apikey': SUPABASE_ANON_KEY,
};

const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

console.log('🧪 Testing Supabase Edge Functions...\n');

// Test Products Endpoint
async function testProducts() {
    console.log('📦 Testing Products Endpoint...');

    try {
        // GET all products
        const response = await fetch(`${FUNCTIONS_URL}/products`, { headers });
        const data = await response.json();

        if (response.ok) {
            console.log('✅ GET /products:', data.products?.length || 0, 'products found');
        } else {
            console.log('❌ GET /products failed:', data.error);
        }
    } catch (error) {
        console.log('❌ Products endpoint error:', error.message);
    }
}

// Test Search Endpoint
async function testSearch() {
    console.log('\n🔍 Testing Search Endpoint...');

    try {
        const response = await fetch(`${FUNCTIONS_URL}/search?q=sofa`, { headers });
        const data = await response.json();

        if (response.ok) {
            console.log('✅ GET /search:', data.count, 'results found');
        } else {
            console.log('❌ GET /search failed:', data.error);
        }
    } catch (error) {
        console.log('❌ Search endpoint error:', error.message);
    }
}

// Test Cart Endpoint (requires auth)
async function testCart() {
    console.log('\n🛒 Testing Cart Endpoint...');

    try {
        const response = await fetch(`${FUNCTIONS_URL}/cart`, { headers });
        const data = await response.json();

        if (response.ok || response.status === 401) {
            console.log('✅ GET /cart: Endpoint accessible');
        } else {
            console.log('❌ GET /cart failed:', data.error);
        }
    } catch (error) {
        console.log('❌ Cart endpoint error:', error.message);
    }
}

// Test Orders Endpoint (requires auth)
async function testOrders() {
    console.log('\n📋 Testing Orders Endpoint...');

    try {
        const response = await fetch(`${FUNCTIONS_URL}/orders`, { headers });
        const data = await response.json();

        if (response.ok || response.status === 401) {
            console.log('✅ GET /orders: Endpoint accessible');
        } else {
            console.log('❌ GET /orders failed:', data.error);
        }
    } catch (error) {
        console.log('❌ Orders endpoint error:', error.message);
    }
}

// Test Analytics Endpoint
async function testAnalytics() {
    console.log('\n📊 Testing Analytics Endpoint...');

    try {
        const response = await fetch(`${FUNCTIONS_URL}/analytics/dashboard`, { headers });
        const data = await response.json();

        if (response.ok) {
            console.log('✅ GET /analytics/dashboard: Stats retrieved');
        } else {
            console.log('❌ GET /analytics/dashboard failed:', data.error);
        }
    } catch (error) {
        console.log('❌ Analytics endpoint error:', error.message);
    }
}

// Run all tests
async function runTests() {
    await testProducts();
    await testSearch();
    await testCart();
    await testOrders();
    await testAnalytics();

    console.log('\n✨ Testing complete!\n');
}

runTests();
