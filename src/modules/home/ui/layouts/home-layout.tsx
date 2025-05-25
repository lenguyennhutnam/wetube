interface LayoutProps {
  children: React.ReactNode;
}
export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className="p-4 bg-blue-300">
        <p>HomeNavbar</p>
      </div>
      {children}
    </div>
  );
};
