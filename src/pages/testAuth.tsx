// pages/testAuth.tsx
import useAuth from '@/hooks/useAuth';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';

export default function TestAuthPage() {
  const { isLogin, user, getUser, logout, login } = useAuth();

  // 하이드레이션 에러 방지: 마운트 이후에만 localStorage 값을 렌더
  const [mounted, setMounted] = useState(false);
  const [lsToken, setLsToken] = useState('');
  const [lsUserId, setLsUserId] = useState('');

  // 폼 상태(테스트용 계정)
  const [email, setEmail] = useState('test.employee@example.com');
  const [password, setPassword] = useState('Passw0rd!');
  const [type, setType] = useState<'employee' | 'employer'>('employee');

  const [notices, setNotices] = useState<any>(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // 마운트 후에만 localStorage 접근
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setLsToken(localStorage.getItem('thejulge_token') ?? '');
      setLsUserId(localStorage.getItem('thejulge_user_id') ?? '');
    }
  }, []);

  // 1) 회원가입: POST /users
  const signup = async () => {
    setLoading(true);
    setMsg('');
    try {
      const { data } = await axios.post('/users', { email, password, type });
      setMsg('회원가입 성공: ' + JSON.stringify(data?.item ?? data));
    } catch (e: any) {
      setMsg('회원가입 실패: ' + (e?.response?.data?.message || e?.message));
    } finally {
      setLoading(false);
    }
  };

  // 2) 로그인: Provider의 login() 사용(토큰/ID 저장 + user 동기화)
  const loginViaProvider = async () => {
    setLoading(true);
    setMsg('');
    try {
      await login({ email, password }); // /token → 저장 → /users/{id} → user 상태 동기화
      if (typeof window !== 'undefined') {
        setLsToken(localStorage.getItem('thejulge_token') ?? '');
        setLsUserId(localStorage.getItem('thejulge_user_id') ?? '');
      }
      setMsg('login() 성공: 토큰/ID 저장 및 user 동기화 완료');
    } catch (e: any) {
      setMsg('login() 실패: ' + (e?.response?.data?.message || e?.message));
    } finally {
      setLoading(false);
    }
  };

  // 3) getUser(): 전역 user 재동기화
  const callGetUser = async () => {
    setLoading(true);
    setMsg('');
    try {
      await getUser();
      setMsg('getUser() 호출 성공: user 상태 갱신');
    } catch (e: any) {
      setMsg('getUser() 실패: ' + (e?.response?.data?.message || e?.message));
    } finally {
      setLoading(false);
    }
  };

  // 4) /notices: Authorization 자동 첨부 확인(캐시 방지 쿼리 추가)
  const callNotices = async () => {
    setLoading(true);
    setMsg('');
    try {
      const { data } = await axios.get('/notices', { params: { limit: 1, _: Date.now() } });
      setNotices(data);
      setMsg('/notices 호출 성공(네트워크 탭에서 Authorization 헤더 확인)');
    } catch (e: any) {
      setMsg('/notices 실패: ' + (e?.response?.data?.message || e?.message));
    } finally {
      setLoading(false);
    }
  };

  // 5) 로그아웃: 토큰/유저 상태/스토리지 비움
  const doLogout = () => {
    logout(); // Provider 상태 비움
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thejulge_token');
      localStorage.removeItem('thejulge_user_id');
      setLsToken('');
      setLsUserId('');
    }
    setMsg('로그아웃 및 localStorage 초기화 완료');
  };

  // 6) 저장소만 비우기
  const clearStorageOnly = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thejulge_token');
      localStorage.removeItem('thejulge_user_id');
      setLsToken('');
      setLsUserId('');
    }
    setMsg('localStorage만 비움(새로고침 시 로그아웃 효과)');
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Test Auth (임시 테스트 전용)</h1>

      <section style={{ marginTop: 16 }}>
        <h3>현재 상태</h3>
        <pre>isLogin: {String(isLogin)}</pre>
        <pre>user: {user ? JSON.stringify(user, null, 2) : 'null'}</pre>
        <pre>localStorage token: {mounted ? lsToken : ''}</pre>
        <pre>localStorage userId: {mounted ? lsUserId : ''}</pre>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>테스트 계정</h3>
        <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
          <input placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
          <input
            placeholder='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div>
            <label style={{ marginRight: 12 }}>
              <input
                type='radio'
                checked={type === 'employee'}
                onChange={() => setType('employee')}
              />{' '}
              employee(알바생)
            </label>
            <label>
              <input
                type='radio'
                checked={type === 'employer'}
                onChange={() => setType('employer')}
              />{' '}
              employer(사장님)
            </label>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 16, display: 'grid', gap: 8, maxWidth: 420 }}>
        <button disabled={loading} onClick={signup}>
          1) 회원가입(POST /users)
        </button>
        <button disabled={loading} onClick={loginViaProvider}>
          2) 로그인(login) & 저장(자동)
        </button>
        <button disabled={loading} onClick={callGetUser}>
          3) getUser()로 전역 user 채우기
        </button>
        <button disabled={loading} onClick={callNotices}>
          4) /notices 호출(Authorization 자동 확인)
        </button>
        <button onClick={doLogout}>로그아웃 + 저장소 비우기</button>
        <button onClick={clearStorageOnly}>저장소만 비우기</button>
      </section>

      {msg && <p style={{ marginTop: 12, whiteSpace: 'pre-wrap', color: '#0a7' }}>{msg}</p>}
      {loading && <p style={{ marginTop: 8 }}>요청 중…</p>}

      <section style={{ marginTop: 16 }}>
        <h3>/notices 응답(샘플)</h3>
        <pre style={{ maxHeight: 260, overflow: 'auto', background: '#f6f6f6', padding: 12 }}>
          {notices ? JSON.stringify(notices, null, 2) : '아직 호출 안 함'}
        </pre>
      </section>

      {/* 확인 포인트 */}
      <section style={{ marginTop: 16 }}>
        <h3>확인 포인트</h3>
        <ol>
          <li>
            1. 회원가입 → <b>로그인(login)</b> 버튼 → <b>localStorage</b>에 token/userId 들어가는지
          </li>
          <li>
            2. <b>getUser()</b> 클릭 시 전역 <b>user 상태</b>가 채워지는지
          </li>
          <li>
            3. <b>/notices</b> 호출 후 DevTools Network →{' '}
            <b>Request Headers → Authorization: Bearer …</b> 확인
          </li>
          <li>
            4. 로그아웃 시 <b>localStorage</b>와 <b>user 상태</b>가 비워지는지
          </li>
        </ol>
      </section>
    </main>
  );
}
