export function Header() {
    return (
        <header className="flex flex-row bg-[#9D7CDE] text-white items-center p-2 justify-between">
                <img src="/LuaBlock_logo.png" />

                <nav className="flex flex-row p-2 space-x-4 mx-auto">
                    <button>만들기</button>
                    <button>튜토리얼</button>
                    <button>소개</button>
                    <button>회원가입</button>
                    <button>로그인</button>
                </nav>
        </header>
    )
}
// 5%