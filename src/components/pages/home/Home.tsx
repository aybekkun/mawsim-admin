import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

interface HomeProps {
	className?: string;
}

const Home: FC<HomeProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Card className="space-y-4 w-96 bg-white">
				<CardContent className="p-4">
					<h2 className="text-3xl">Добро пожаловать</h2>
					<p>Выберите необходимый пункт меню, чтобы начать работу</p>
				</CardContent>
				<svg width="99" height="62"  viewBox="0 0 99 62" fill="#A8AAAC" xmlns="http://www.w3.org/2000/svg">
					<path d="M97.7679 2.64057C98.1217 2.21647 98.0647 1.58588 97.6406 1.2321C97.2165 0.878324 96.5859 0.935329 96.2321 1.35943L97.7679 2.64057ZM92.5766 6.33462L93.2597 7.06492L92.5766 6.33462ZM76.7651 18.1267L77.2031 19.0256L76.7651 18.1267ZM54.2907 23.7677L54.2084 24.7643L54.2147 24.7648L54.2907 23.7677ZM49.142 14.1649L48.4383 13.4544L48.3601 13.5318L48.3007 13.6244L49.142 14.1649ZM64.7653 20.4105L65.7602 20.3101L64.7653 20.4105ZM61.7608 33.6327L62.5102 34.2948L62.5737 34.2229L62.6224 34.1402L61.7608 33.6327ZM1.32618 52.1307C0.918101 52.5029 0.888963 53.1354 1.2611 53.5434L7.32546 60.1935C7.6976 60.6016 8.33009 60.6307 8.73817 60.2586C9.14626 59.8865 9.17539 59.254 8.80325 58.8459L3.41272 52.9347L9.3239 47.5442C9.73198 47.172 9.76112 46.5395 9.38898 46.1315C9.01684 45.7234 8.38435 45.6942 7.97626 46.0664L1.32618 52.1307ZM96.2321 1.35943C95.4071 2.34841 92.8562 4.70369 91.8934 5.60433L93.2597 7.06492C94.1472 6.23473 96.8393 3.7537 97.7679 2.64057L96.2321 1.35943ZM91.8934 5.60433C87.1418 10.0491 82.093 14.4183 76.327 17.2277L77.2031 19.0256C83.2603 16.0743 88.4959 11.5211 93.2597 7.06492L91.8934 5.60433ZM76.327 17.2277C69.0049 20.7953 60.5814 23.2441 54.3666 22.7706L54.2147 24.7648C60.9482 25.2778 69.7533 22.6555 77.2031 19.0256L76.327 17.2277ZM54.3729 22.7711C51.5524 22.5383 49.8278 21.5132 49.1024 20.2265C48.3976 18.9765 48.4368 17.1125 49.9833 14.7054L48.3007 13.6244C46.5297 16.3808 46.1552 19.0715 47.3602 21.2088C48.5444 23.3093 51.0528 24.5038 54.2084 24.7643L54.3729 22.7711ZM49.8457 14.8754C52.3388 12.4061 55.6084 12.1453 58.3971 13.3491C61.2096 14.5633 63.4395 17.2339 63.7703 20.511L65.7602 20.3101C65.3484 16.231 62.5911 12.9813 59.1898 11.5129C55.7647 10.0343 51.5941 10.3288 48.4383 13.4544L49.8457 14.8754ZM63.7703 20.511C64.0972 23.7484 64.1928 25.4119 63.8378 26.9908C63.4814 28.5756 62.6555 30.143 60.8991 33.1253L62.6224 34.1402C64.3521 31.2034 65.3526 29.3706 65.7891 27.4295C66.2269 25.4825 66.0817 23.4944 65.7602 20.3101L63.7703 20.511ZM61.0113 32.9707C47.3747 48.4067 23.3685 52.853 2.04602 51.8707L1.95398 53.8686C23.46 54.8593 48.2585 50.427 62.5102 34.2948L61.0113 32.9707Z"></path>
				</svg>
			</Card>
		</div>
	);
};

export default Home;
