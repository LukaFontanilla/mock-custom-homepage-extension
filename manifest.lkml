project_name: "<insert project name>"

# # Use local_dependency: To enable referencing of another project
# # on this instance with include: statements
#

application: custom-homepage-extension {
  label: "Custom Homepage"
  url: "http://localhost:8080/bundle.js"
  # file: "bundle.js
  entitlements: {
    new_window: yes
    use_iframes: yes
    use_embeds: yes
    navigation: yes
    # core_api_methods: ["me","folder","folder_children","search_folders","all_content_metadata_accesses"]
    core_api_methods: ["me","folder","folder_dashboards"]
    external_api_urls : ["http://localhost:8080","https://localhost:8080"]
    #Add more entitlements here as you develop new functionality
  }
}
