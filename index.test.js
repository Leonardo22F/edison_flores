import request from 'supertest';
import app from './index.js';

// Unit test for sum logic (extracted for testing)
function calculateSum(a, b) {
  return (parseFloat(a) || 0) + (parseFloat(b) || 0);
}

describe('Unit Tests', () => {
  test('calculateSum should return correct sum', () => {
    expect(calculateSum(2, 3)).toBe(5);
    expect(calculateSum('2', '3')).toBe(5);
    expect(calculateSum(null, 5)).toBe(5);
    expect(calculateSum(2.5, 3.5)).toBe(6);
  });
});

describe('Integration Tests', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hola Edison desde Node.js con Docker y CI!" });
  });

  test('GET /sum should return sum of query params', async () => {
    const response = await request(app).get('/sum?a=2&b=3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 5 });
  });

  test('GET /sum with invalid params should handle gracefully', async () => {
    const response = await request(app).get('/sum?a=abc&b=3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 3 }); // parseFloat('abc') is NaN, treated as 0
  });
});