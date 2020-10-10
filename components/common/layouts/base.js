import Header from '@/components/common/header';

const withBaseLayout = (children) => {
	return (props) => (
		<div>
			<Header />
			<div className="dashboard-content fixed flex w-full">
				<div className="w-full">
					{children(props)}
				</div>
			</div>
			<style jsx>{`
				.dashboard-content {
					height: calc(100vh - 4rem);
				}
				.sidemenu-container {
					background: #f7fbff;
					z-index: 10;
				}
				.core-content {
					width: calc(100vw - 13rem);
					animation: fadein 100ms;
				}
				@keyframes fadein {
					from {
						opacity: 0;
						transform: scale(0.7);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}
			`}</style>
		</div>
	);
};

export default withBaseLayout;