import useAuth from '@/hooks/useAuth';

export default function AuthRolePreview() {
  const { user, isLogin } = useAuth();

  if (!isLogin) {
    return (
      <div>
        비로그인 상태 (게스트 UI)
        <br />
        !isLogin
      </div>
    );
  }

  if (user?.type === 'employer') {
    return (
      <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
        <h2>사장님 전용 화면</h2>
        <p>user?.type === 'employer'</p>
        <p>
          여기서는 <strong>내 가게 관리 employer</strong> UI를 보여주면 됩니다.
        </p>
      </div>
    );
  }

  if (user?.type === 'employee') {
    return (
      <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
        <h2>알바생 전용 화면 </h2>
        <p> user?.type === 'employee' </p>
        <p>
          여기서는 <strong>내 프로필 </strong> UI를 보여주면 됩니다.
        </p>
      </div>
    );
  }

  return <div>알 수 없는 권한</div>;
}
