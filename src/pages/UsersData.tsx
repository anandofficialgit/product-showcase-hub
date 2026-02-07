import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUsers, downloadUsersAsFile, type User } from "@/lib/userStorage";
import Header from "@/components/Header";
import { Download, Eye, EyeOff } from "lucide-react";

const UsersData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    const loadUsers = () => {
      const allUsers = getUsers();
      setUsers(allUsers);
    };
    loadUsers();
  }, []);

  const handleDownload = () => {
    downloadUsersAsFile();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Users Data</CardTitle>
                  <CardDescription>
                    View and download user credentials stored in localStorage
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide Passwords
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show Passwords
                      </>
                    )}
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No users found in storage.</p>
                  <p className="text-sm mt-2">
                    <Link to="/signup" className="text-primary hover:underline">
                      Create an account
                    </Link>{" "}
                    to see data here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Total users: {users.length}
                  </div>
                  <div className="space-y-3">
                    {users.map((user, index) => (
                      <Card key={index} className="bg-secondary/50">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Name</p>
                              <p className="text-base">{user.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Mobile Number</p>
                              <p className="text-base">{user.mobileNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Username</p>
                              <p className="text-base">{user.username}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Password</p>
                              <p className="text-base font-mono">
                                {showPasswords ? user.password : "••••••"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Storage Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Storage Location:</strong> Browser localStorage
                </p>
                <p>
                  <strong>Storage Key:</strong> <code className="bg-secondary px-2 py-1 rounded">users_data</code>
                </p>
                <p>
                  <strong>How to Access:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-4 text-muted-foreground">
                  <li>Open Browser Developer Tools (F12)</li>
                  <li>Go to "Application" tab (Chrome) or "Storage" tab (Firefox)</li>
                  <li>Click on "Local Storage" → your domain</li>
                  <li>Look for key: <code className="bg-secondary px-1 py-0.5 rounded">users_data</code></li>
                </ol>
                <p className="pt-2">
                  <strong>Note:</strong> Data is stored locally in your browser. To save it as a file, click "Download JSON" above.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsersData;
