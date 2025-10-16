// import useAuth from '@/hooks/useAuth';

// export default function AuthRolePreview() {
//   const { role, user } = useAuth();

//   if (role === 'employer') {
//     return (
//       <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
//         <h2>사장님 전용 화면</h2>
//         <p>role === 'employer'</p>
//         <p>
//           <strong>{user?.name}</strong>님의 가게 관리 화면
//         </p>
//       </div>
//     );
//   }

//   if (role === 'employee') {
//     return (
//       <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
//         <h2>알바생 전용 화면</h2>
//         <p>role === 'employee'</p>
//         <p>
//           <strong>{user?.name}</strong>님의 프로필 화면
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
//         <h2>비로그인 상태 (게스트 UI)</h2>
//         <p>role === 'guest'</p>
//       </div>
//     </div>
//   );
// }
