using System;
using System.IO;
using System.Web;
using System.Web.UI;

namespace CentralProjeForInfosec
{
    public partial class Tableau : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Initialize the page
            InitializePage();

            // Other code ...

            // Vulnerability at line 37: retrieving dynamic data from QueryString
            string fileName = Request.QueryString["fileName"];

            // Some other code ...

            try
            {
                // Vulnerability at line 54: using the dynamic data in a file path
                string filePath = Path.Combine(Server.MapPath("~/uploads/"), fileName);
                
                if (File.Exists(filePath))
                {
                    // Read and process the file
                    string fileContent = File.ReadAllText(filePath);
                    Response.Write(fileContent);
                }
                else
                {
                    Response.Write("File not found.");
                }
            }
            catch (Exception ex)
            {
                Response.Write("An error occurred: " + ex.Message);
            }

            // More code ...
        }

        private void InitializePage()
        {
            // Initialization logic
            Response.Write("Page Initialization");
        }

        protected void Button_Click(object sender, EventArgs e)
        {
            // Button click logic
            Response.Write("Button clicked");
        }

        private void LogError(Exception ex)
        {
            // Error logging logic
            File.AppendAllText(Server.MapPath("~/logs/error.log"), ex.ToString());
        }
    }
}




159.117.145.80
159.117.145.81
159.117.145.82
159.117.145.83
159.117.145.84
159.117.145.85
159.117.145.86
159.117.145.87
159.117.145.88
159.117.145.89
159.117.145.90
159.117.145.91
159.117.145.92
159.117.145.93
159.117.145.94
159.117.145.95
40.80.92.128
52.172.187.169
4.224.31.197
104.211.91.129
104.211.95.92
4.186.12.130
13.71.30.28
52.172.207.157
20.235.122.29
13.71.18.100
4.186.12.41
98.70.97.106
20.198.91.218
52.172.132.218
4.213.100.14
74.225.184.164
13.71.1.1
125.20.124.22
125.20.124.20
125.20.124.21
125.20.124.23
136.232.201.236
136.232.201.237
136.232.201.238
136.232.201.239
182.72.219.96
182.72.219.97
182.72.219.98
182.72.219.99
115.242.144.192
115.242.144.193
115.242.144.194
115.242.144.195
61.0.239.8
61.0.239.9
61.0.239.10
61.0.239.11
61.0.239.12
61.0.239.13
61.0.239.14
61.0.239.15
115.245.152.84
115.245.152.85
115.245.152.86
115.245.152.87
125.20.51.18
125.20.51.16
125.20.51.17
125.20.51.19
117.239.234.177
117.239.234.176
117.239.234.178
117.239.234.179
117.239.239.242
117.239.239.240
117.239.239.241
117.239.239.243
117.239.239.244
117.239.239.245
117.239.239.246
117.239.239.247
117.192.9.138
117.192.9.136
117.192.9.137
117.192.9.139
117.192.9.140
117.192.9.141
117.192.9.142
117.192.9.143
117.240.156.154
117.240.156.152
117.240.156.153
117.240.156.155
117.240.156.156
117.240.156.157
117.240.156.158
117.240.156.159
117.200.58.73
117.200.58.72
117.200.58.74
117.200.58.75
43.251.81.186
43.251.81.184
43.251.81.185
43.251.81.187
43.251.81.188
43.251.81.189
43.251.81.190
43.251.81.191
115.112.60.42
115.112.60.40
115.112.60.41
115.112.60.43
115.112.60.44
115.112.60.45
115.112.60.46
115.112.60.47
45.112.202.98
45.112.202.96
45.112.202.97
45.112.202.99
45.112.202.100
45.112.202.101
45.112.202.102
45.112.202.103
103.176.195.74
103.176.195.72
103.176.195.73
103.176.195.75
103.176.195.76
103.176.195.77
103.176.195.78
103.176.195.79
103.125.155.138
103.125.155.129
159.117.144.86
123.108.42.193
103.125.155.128
103.125.155.130
103.125.155.131
103.125.155.132
103.125.155.133
103.125.155.134
103.125.155.135
103.125.155.136
103.125.155.137
103.125.155.139
103.125.155.140
103.125.155.141
103.125.155.142
103.125.155.143
103.125.155.144
103.125.155.145
103.125.155.146
103.125.155.147
103.125.155.148
103.125.155.149
103.125.155.150
103.125.155.151
103.125.155.152
103.125.155.153
103.125.155.154
103.125.155.155
103.125.155.156
103.125.155.157
103.125.155.158
103.125.155.159
103.125.155.160
103.125.155.161
103.125.155.162
103.125.155.163
103.125.155.164
103.125.155.165
103.125.155.166
103.125.155.167
103.125.155.168
103.125.155.169
103.125.155.170
103.125.155.171
103.125.155.172
103.125.155.173
103.125.155.174
103.125.155.175
103.125.155.176
103.125.155.177
103.125.155.178
103.125.155.179
103.125.155.180
103.125.155.181
103.125.155.182
103.125.155.183
103.125.155.184
103.125.155.185
103.125.155.186
103.125.155.187
103.125.155.188
103.125.155.189
103.125.155.190
103.125.155.191
182.74.171.0
182.74.171.1
182.74.171.2
182.74.171.3
182.74.171.4
182.74.171.5
182.74.171.6
182.74.171.7
136.232.203.14
136.232.203.13
125.20.125.182
125.20.125.181
136.232.203.38
136.232.203.37
125.22.167.78
125.22.167.77
125.21.51.194
125.21.51.193
117.254.84.218
117.254.84.217
43.251.80.210
43.251.80.209
125.16.2.234
125.16.2.233
125.17.71.158
125.17.71.157
122.186.148.26
122.186.148.25
61.0.237.42
61.0.237.41
125.20.80.166
125.20.80.165
136.232.197.198
136.232.197.197
36.255.84.98
36.255.84.97
61.246.77.226
61.246.77.225
125.21.235.250
125.21.235.249
136.232.222.70
136.232.222.69
14.143.126.165
14.143.126.161
136.232.203.12
136.232.203.15
125.20.125.180
125.20.125.183
136.232.203.36
136.232.203.39
125.22.167.76
125.22.167.79
125.21.51.192
125.21.51.195
125.16.2.232
125.16.2.235
117.254.84.216
117.254.84.219
117.254.84.220
117.254.84.221
117.254.84.222
117.254.84.223
43.251.80.208
43.251.80.211
43.251.80.212
43.251.80.213
43.251.80.214
43.251.80.215
125.17.71.156
125.17.71.159
122.186.148.24
122.186.148.27
61.0.237.40
61.0.237.43
61.0.237.44
61.0.237.45
61.0.237.46
61.0.237.47
125.20.80.164
125.20.80.167
136.232.197.196
136.232.197.199
36.255.84.96
36.255.84.99
61.246.77.224
61.246.77.227
61.246.77.228
61.246.77.229
61.246.77.230
61.246.77.231
125.21.235.248
125.21.235.251
136.232.222.68
136.232.222.71
14.143.126.128
14.143.126.129
14.143.126.130
14.143.126.131
14.143.126.132
14.143.126.133
14.143.126.134
14.143.126.135
14.143.126.136
14.143.126.137
14.143.126.138
14.143.126.139
14.143.126.140
14.143.126.141
14.143.126.142
14.143.126.143
14.143.126.144
14.143.126.145
14.143.126.146
14.143.126.147
14.143.126.148
14.143.126.149
14.143.126.150
14.143.126.151
14.143.126.152
14.143.126.153
14.143.126.154
14.143.126.155
14.143.126.156
14.143.126.157
14.143.126.158
14.143.126.159
125.21.51.196
125.21.51.197
125.21.51.198
125.21.51.199
