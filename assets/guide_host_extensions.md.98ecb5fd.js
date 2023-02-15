import{_ as s,c as a,o as n,a as o}from"./app.6562f21d.js";const m=JSON.parse('{"title":"Writing Extension Commands","description":"","frontmatter":{},"headers":[],"relativePath":"guide/host/extensions.md"}'),e={name:"guide/host/extensions.md"},t=o(`<h1 id="writing-extension-commands" tabindex="-1">Writing Extension Commands <a class="header-anchor" href="#writing-extension-commands" aria-hidden="true">#</a></h1><p>Oakton has a strong extensibility model to find and activate commands from external assemblies. If an application uses the <code>RunOaktonCommands(args)</code> method, Oakton will look for any Oakton commands in any assembly that has this assembly level attribute:</p><p><a id="snippet-sample_using_oaktoncommandassemblyattribute"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">assembly</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;">Oakton</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">OaktonCommandAssembly</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/oakton/blob/master/src/AspNetCoreExtensionCommands/BuildCommand.cs#L4-L6" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_using_oaktoncommandassemblyattribute" title="Start of snippet">anchor</a></sup></p><div class="tip custom-block"><p class="custom-block-title">warning</p><p>You will have to explicitly add this attribute to the main assembly of your application to make Oakton discover commands in that assembly. Oakton no longer supports trying to walk the call stack to determine the main application assembly.</p></div><p>Extension commands can be either basic <code>OaktonCommand</code> or <code>OaktonAsyncCommand</code> classes. To add an extension command that uses the <code>HostBuilder</code> configuration of the application, the command needs to use the <code>NetCoreInput</code> class or a class that inherits from <code>NetCoreInput</code>. In this simple example below, I&#39;ve built a command that just tries to do a &quot;smoke test&quot; by calling the <code>HostBuilder.Build()</code> method and seeing if any exceptions happen:</p><p><a id="snippet-sample_smokecommand"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">Description</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Simply try to build a web host as a smoke test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Name</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">smoke</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SmokeCommand</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OaktonCommand</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">NetCoreInput</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">override</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">bool</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Execute</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">NetCoreInput</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">input</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// This method builds out the IWebHost for your</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// configured IHostBuilder of the application</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F78C6C;">using</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">host</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> input</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">BuildHost</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            Console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteLine</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">It&#39;s all good</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/oakton/blob/master/src/AspNetCoreExtensionCommands/BuildCommand.cs#L11-L27" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_smokecommand" title="Start of snippet">anchor</a></sup></p><p>The <code>NetCoreInput</code> carries the <code>IHostBuilder</code> of your application, but does <strong>not</strong> start up or build the <code>IHost</code> by itself. You would have to explicitly do so, but making that lazy gives you the ability to alter or extend the application configuration before calling <code>IHostBuilder.Build()</code> or <code>IHostBuilder.Start()</code>.</p>`,11),l=[t];function p(c,r,i,y,d,F){return n(),a("div",null,l)}const C=s(e,[["render",p]]);export{m as __pageData,C as default};
