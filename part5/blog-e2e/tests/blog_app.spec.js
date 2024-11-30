const { test, expect, describe, beforeEach } = require('@playwright/test');
const { loginWith, createBlog, openBlogDetails } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // clear test database
    await request.post('/api/testing/reset');
    // create a user for the backend here
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testuserpassword',
      },
    });
    // ...
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs');
    await expect(locator).toBeVisible();
    await expect(page.getByText('login to application')).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'testuserpassword');
      await expect(page.getByText('Test User is logged in')).toBeVisible();
    });
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'notauser', 'test123');
      const errorDiv = await page.locator('.error');
      await expect(errorDiv).toContainText('Invalid username or Password');
    });
  });

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testuserpassword');
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'Test Title',
        author: 'Test Author',
        url: 'testurl.com',
      });
      await expect(
        page.getByText('Test Title has been added to the blog.')
      ).toBeVisible();
    });

    describe('and blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: 'Test Title1',
          author: 'Test Author1',
          url: 'testurl1.com',
        });
        await createBlog(page, {
          title: 'Test Title2',
          author: 'Test Author2',
          url: 'testurl2.com',
        });
        await createBlog(page, {
          title: 'Test Title3',
          author: 'Test Author3',
          url: 'testurl3.com',
        });
      });

      test('blog can be liked', async ({ page }) => {
        await page
          .locator('div')
          .filter({ hasText: /^Test Title3 Test Author3View$/ })
          .getByRole('button', { name: 'View' })
          .click();

        await page.getByText('testurl3.com').waitFor();
        await expect(page.getByText('Likes: 0')).toBeVisible();
        await page.getByRole('button', { name: 'Like' }).click();
        await expect(page.getByText('Likes: 1')).toBeVisible();
      });

      test('blog can be deleted', async ({ page }) => {
        await page
          .locator('div')
          .filter({ hasText: /^Test Title2 Test Author2View$/ })
          .getByRole('button', { name: 'View' })
          .click();
        await page.getByText('testurl2.com').waitFor();

        page.once('dialog', (dialog) => {
          dialog.accept().catch(() => {});
        });
        await page.getByRole('button', { name: 'delete' }).click();
        await expect(page.getByText('Test Title2')).not.toBeVisible();
      });
      //this test can be improved
      test('blog is arranged in order according to likes', async ({ page }) => {
        await page
          .locator('div')
          .filter({ hasText: /^Test Title2 Test Author2View$/ })
          .getByRole('button', { name: 'View' })
          .click();
        await page.getByText('testurl2.com').waitFor();
        await expect(page.getByText('Likes: 0')).toBeVisible();
        await page.getByRole('button', { name: 'Like' }).click();
        await page.getByText('Likes: 1').waitFor();
        await page.getByRole('button', { name: 'Like' }).click();
        await page.getByText('Likes: 2').waitFor();
        await page.getByRole('button', { name: 'Like' }).click();
        await expect(page.getByText('Likes: 3')).toBeVisible();
        await page.locator('div').getByRole('button', { name: 'Hide' }).click();

        await page
          .locator('div')
          .filter({ hasText: /^Test Title3 Test Author3View$/ })
          .getByRole('button', { name: 'View' })
          .click();

        await page.getByText('testurl3.com').waitFor();
        await expect(page.getByText('Likes: 0')).toBeVisible();
        await page.getByRole('button', { name: 'Like' }).click();
        await expect(page.getByText('Likes: 1')).toBeVisible();
        await page.locator('div').getByRole('button', { name: 'Hide' }).click();
        //codegen generated
        await expect(page.getByTestId('blogList')).toContainText(
          'Test Title2 Test Author2ViewTest Title3 Test Author3ViewTest Title1 Test Author1View'
        );
      });
    });
  });
});
