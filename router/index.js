const Router = require('koa-router');
const { query } = require('../db');

const router = new Router();

// 查询所有用户
router.get('/users', async (ctx) => {
  try {
    const result = await query('SELECT * FROM user_info');
    ctx.body = { code: 0, data: result };
  } catch (error) {
    console.error(error);
    ctx.body = { code: -1, message: '查询失败' };
  }
});

// 根据id查询用户
router.get('/users/:uuid', async (ctx) => {
  const { uuid } = ctx.params;
  try {
    const result = await query('SELECT * FROM user_info WHERE uuid = ?', [uuid]);
    if (result.length) {
      ctx.body = { code: 0, data: result[0] };
    } else {
      ctx.body = { code: -1, message: '用户不存在' };
    }
  } catch (error) {
    console.error(error);
    ctx.body = { code: -1, message: '查询失败' };
  }
});

// 添加用户
router.post('/users', async (ctx) => {
  const { username, age, email } = ctx.request.body;
  try {
    await query('INSERT INTO user_info (username, age, email) VALUES (?, ?, ?)', [username, age, email]);
    ctx.body = { code: 0, message: '添加成功' };
  } catch (error) {
    console.error(error);
    ctx.body = { code: -1, message: '添加失败' };
  }
});

// 更新用户
router.put('/users/:uuid', async (ctx) => {
  const { uuid } = ctx.params;
  const { username, age, email } = ctx.request.body;
  try {
    const result = await query('UPDATE user_info SET username = ?, age = ?, email = ? WHERE uuid = ?', [username, age, email, uuid]);
    // result.affectedRows表示在执行UPDATE语句后受影响的行数。
    // 如果有行受到更新，则result.affectedRows的值将大于0，如果没有任何行受到更新，则其值将为0。
    if (result.affectedRows) { 
      ctx.body = { code: 0, message: '更新成功' };
    } else {
      ctx.body = { code: -1, message: '用户不存在' };
    }
  } catch (error) {
    console.error(error);
    ctx.body = { code: -1, message: '更新失败' };
  }
});

// 删除用户
router.delete('/users/:uuid', async (ctx) => {
  const { uuid } = ctx.params;
  try {
    const result = await query('DELETE FROM user_info WHERE uuid = ?', [uuid]);
    if (result.affectedRows) {
      ctx.body = { code: 0, message: '删除成功' };
    } else {
      ctx.body = { code: -1, message: '用户不存在' };
    }
  } catch (error) {
    console.error(error);
    ctx.body = { code: -1, message: '删除失败' };
  }
});

module.exports = router;