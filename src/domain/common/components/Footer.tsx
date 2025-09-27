const address = "서울특별시 강남구 테헤란로 215, 10층";
const name = "김민수";
const businessNumber = "123-45-67890";
const representativePhoneNumber = "02-3456-7890";
const email = "contact@samplecorp.com";

function Footer() {
  return (
    <footer className="bg-rbBackground py-8 relative  flex justify-center text-rbGrayText">
      <div className="relative">
        {/* 로고 */}
        <div className="absolute left-[-200px] top-2">
          <img
            src="/grayCoblocksLogo.png"
            alt="Coblocks Logo"
            className="h-6"
          />
        </div>

        {/* 회사 정보 */}
        <div className="text-xs">
          <div className="mb-2">
            <span className="font-medium">주소: </span>{" "}
            <span className="mr-6">{address}</span>
            <span className="font-medium">대표: </span>{" "}
            <span className="mr-6">{name}</span>
          </div>
          <div className="mt-2">
            <span className="font-medium">사업자등록번호: </span>
            <span className="mr-6">{businessNumber}</span>
            <span className="font-medium">대표전화: </span>
            <span className="mr-6">{representativePhoneNumber}</span>
            <span className="font-medium">이메일: </span> {email}
          </div>
        </div>
      </div>
      {/* 하단 카피라이트 */}
      <div className="my-2 absolute text-xs text-rbGrayText bottom-2 right-2">
        © {new Date().getFullYear()}All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
